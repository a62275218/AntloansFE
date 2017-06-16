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

        $('.saveBtn01').click(function(){
          $('.job_show').show();
          $('.job_edit').hide();
        });

      // ========= edit vertical timeline ========
      console.log(Array.isArray(status));
       $('.timeline_editBtn').click(function(){
          $('.timeline').css('border-left',"3px dotted #B5B5B5");
          $('.circle').css('cursor','pointer');
          $('.circle').click(function(e){
             $(e.target).toggleClass('done');
             $(e.target).prev().addClass('done');
            //  console.log(status.indexOf($(e.target)));
          });


       })

       $('.approval_down_left .saveBtn').click(function(){
          $('.timeline').css('border-left',"3px solid #B5B5B5");
          $('.circle').unbind();
          $('.circle').css('cursor','default');

       })


}]);
