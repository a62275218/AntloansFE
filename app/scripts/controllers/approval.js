antloans.controller('approvalCtrl',['$scope','jobService','$stateParams',
    function($scope,jobService,$stateParams){
    console.log($stateParams);
        jobService.getaJob($stateParams.jobId)
            .then(function(response){
                $scope.job = response.data.data;
                console.log($scope.job)
            },function(e){
                console.log(e)
            });

     // =======  edit a job ==============
        $('#jobEditBtn').click(function(){
             $('.job_show').hide();
             $('.job_edit').show();
        });

        $('.cancelBtn01').click(function(){
          $('.job_show').show();
          $('.job_edit').hide();
        });

        $('.saveBtn01').click(function(){
          $('.job_show').show();
          $('.job_edit').hide();
        });

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


}]);
