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
                  status[i].addClass('done');
                }
             }else{
               for(var j = index+1; j<status.length; j++){
                  status[j].removeClass('done');
               }
             }

             var num = $('.circle.done').length;
             console.log("================="+num);
             if (num<3){
               $('.submission i').removeClass('done');
               $('.submission_name').removeClass('done');
               $('.assessment i').removeClass('done');
               $('.assessment_name').removeClass('done');
               $('.settlement i').removeClass('done');
               $('.settlement_name').removeClass('done');
             }
             if(num>=3&&num<9){
               $('.submission i').addClass('done');
               $('.submission_name').addClass('done');
               $('.assessment i').removeClass('done');
               $('.assessment_name').removeClass('done');
               $('.settlement i').removeClass('done');
               $('.settlement_name').removeClass('done');
             }
             if(num>=9&&num<12){
               $('.submission i').addClass('done');
               $('.submission_name').addClass('done');
               $('.assessment i').addClass('done');
               $('.assessment_name').addClass('done');
               $('.settlement i').removeClass('done');
               $('.settlement_name').removeClass('done');
             }
             if(num==12){
               $('.submission i').addClass('done');
               $('.submission_name').addClass('done');
               $('.assessment i').addClass('done');
               $('.assessment_name').addClass('done');
               $('.settlement i').addClass('done');
               $('.settlement_name').addClass('done');
             }
          });

       });

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
                    console.log($scope.comments)
                    var scrollBot = function() {
                        $('.message_wrap').scrollTop($('.message_wrap')[0].scrollHeight);
                        console.log($('.message_wrap')[0].scrollHeight)
                    };
                    setTimeout(scrollBot(),4000)
                },function(e){});
            $scope.comment = '';
            $scope.makeComment = function(){
                jobService.makeComment($stateParams.jobId,{content:$scope.comment})
                    .then(function(response){
                        if(response.status == 200){
                            $scope.comment = '';
                            jobService.getComments($stateParams.jobId)
                                .then(function(response){
                                    $scope.comments = response.data.data;
                                },function(e){});
                            swal("Success!", "Comment added", "success");
                            $('.message_wrap').scrollTop($('.message_wrap')[0].scrollHeight);
                            console.log($('.message_wrap')[0].scrollHeight)
                        }
                    },function(e){
                        swal("Oops...", "Something went wrong! Update failed", "error");
                    })
            };

            $(function () {
                var scrollBot = function() {
                    $('.message_wrap').scrollTop($('.message_wrap')[0].scrollHeight);
                    console.log($('.message_wrap')[0].scrollHeight)
                };
                setTimeout(scrollBot(),4000)
            });
    }]);
