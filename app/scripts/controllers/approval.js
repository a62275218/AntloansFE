antloans.controller('approvalCtrl',['$scope','jobService','$stateParams','UserService',
    function($scope,jobService,$stateParams,UserService){
    console.log($stateParams);
        jobService.getaJob($stateParams.jobId)
            .then(function(response){
                $scope.job = response.data.data;
                console.log($scope.job)
            },function(e){
                console.log(e)
            });

    $scope.updateUser = function(){
        UserService.updateUser($scope.job.client_id,
            {
                firstName:$scope.job.first_name,
                lastName:$scope.job.last_name,
                phone:$scope.job.phone,
                mobile:$scope.job.mobile,
                address:$scope.job.address,
                email:$scope.job.email,
                role:'customer'
            }
        ).then(function(response){
            if(response.status == 200){
                swal("Success!", "User updated", "success")
            }
        },function(e){
            swal("Oops...", "Something went wrong! Update failed", "error");
        })
    };

      // ========= edit vertical timeline ========
      var status = [];
      status.push($('.circle.1'),$('.circle.2'),$('.circle.3'),$('.circle.4'),$('.circle.5'),
                  $('.circle.6'),$('.circle.7'),$('.circle.8'),$('.circle.9'),$('.circle.10'),
                  $('.circle.11'),$('.circle.12'));

       $('.timeline_editBtn').click(function(){
          $('.timeline').css('border-left',"3px dotted #B5B5B5");
          $('.circle').css('cursor','pointer');
          $('.circle').click(function(e){
             $(e.target).toggleClass('done');
             var index = parseInt($(e.target).attr('data-index'));
             if($(e.target).hasClass("done")){
                for(var i = 0; i<index; i++){
                  status[i].addClass('done')
                }
             }else{
               for(var j = index+1; j<=status.length+1; j++){
                  status[j].removeClass('done');
               }
             }
          });

       })

       $('.approval_down_left .saveBtn').click(function(){
          $('.timeline').css('border-left',"3px solid #B5B5B5");
          $('.circle').unbind();
          $('.circle').css('cursor','default');

       })
}])
    .controller('messageCtrl',['$scope','jobService','$stateParams',
        function($scope,jobService,$stateParams){
            jobService.getComments($stateParams.jobId)
                .then(function(response){
                    $scope.comments = response.data.data;
                    /*angular.forEach($scope.comments,function(k,v){
                       if(k == 'create_at'){
                            v = newDate(v);
                       }
                    });*/
                    console.log($scope.comments)
                },function(e){})
    }]);
