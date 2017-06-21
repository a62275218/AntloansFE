antloans.controller('approvalCtrl', ['$scope', 'jobService', '$stateParams', 'UserService',
    function ($scope, jobService, $stateParams, UserService) {
        var vm = this;
        var deal_status_value = '';
        vm.checkStatus = function (obj) {
            if (obj.deal_status) {
                return obj.deal_status.value;
            }
        };

        //  get the status value of current deal
        jobService.getaJob($stateParams.jobId)
                .then(function (response) {
                    $scope.job = response.data.data;
                    deal_status_value = vm.checkStatus($scope.job);
                    // console.log("================");
                    // console.log(deal_status);
                    vm.showStatus(deal_status_value);
                }, function (e) {
                    console.log(e)
                });

       // show status in the timeline
       vm.showStatus = function (deal_status_value){
         var status = [];
         status.push($('.circle.1'), $('.circle.2'), $('.circle.3'), $('.circle.4'), $('.circle.5'),
             $('.circle.6'), $('.circle.7'), $('.circle.8'), $('.circle.9'), $('.circle.10'),
             $('.circle.11'), $('.circle.12'));
         status[deal_status_value-1].addClass('done');
         var index = parseInt(deal_status_value-1);
         if (status[deal_status_value-1].hasClass("done")) {
             for (var i = 0; i < index; i++) {
                 status[i].addClass('done');
             }
             for (var j = index + 1; j < status.length; j++) {
                 status[j].removeClass('done');
             }
             updateStatusLight();
         }
       }

        // ======= update the above user info
        $scope.updateUser = function () {
            $('.job_show td input').attr('disabled');
            $('.job_show td input').addClass('disable');
            UserService.updateUser($scope.job.client_id,
                {
                    firstName: $scope.job.first_name,
                    lastName: $scope.job.last_name,
                    phone: $scope.job.phone,
                    mobile: $scope.job.mobile,
                    address: $scope.job.address,
                    email: $scope.job.email,
                    role: 'customer'
                }
            ).then(function (response) {
                if (response.status == 200) {
                    swal("Success!", "User updated", "success")
                }
            }, function (e) {
                swal("Oops...", "Something went wrong! Update failed", "error");
            })
        };
        // edit job info
        $scope.jobEdit = function () {
            $('.job_show td input').removeAttr('disabled').removeClass('disable');
        }

        // ========= edit vertical timeline ========

        $('.timeline_editBtn').click(function () {
          var status = [];
          status.push($('.circle.1'), $('.circle.2'), $('.circle.3'), $('.circle.4'), $('.circle.5'),
              $('.circle.6'), $('.circle.7'), $('.circle.8'), $('.circle.9'), $('.circle.10'),
              $('.circle.11'), $('.circle.12'));

            $('.timeline li div.circle').addClass('canEdit');
            $('.timeline_editBtn').addClass('edit');
            $('.timeline').css('border-left', "3px dotted #B5B5B5");
            $('.circle').css('cursor', 'pointer');
            $('.circle').click(function (e) {
                $(e.target).toggleClass('done');
                var index = parseInt($(e.target).attr('data-index'));
                if ($(e.target).hasClass("done")) {
                    for (var i = 0; i < index; i++) {
                        status[i].addClass('done');
                    }
                } else {
                    for (var j = index + 1; j < status.length; j++) {
                        status[j].removeClass('done');
                    }
                }
                updateStatusLight();

            });

        });

        // connect the timeline status to above status lights
        function updateStatusLight(){
          var num = $('.circle.done').length;
          if (num < 1) {
              $('.submission i').removeClass('done');
              $('.submission_name').removeClass('done');
              $('.assessment i').removeClass('done');
              $('.assessment_name').removeClass('done');
              $('.settlement i').removeClass('done');
              $('.settlement_name').removeClass('done');
          }
          if (num >= 1 && num <= 3) {
              $('.submission i').addClass('done');
              $('.submission_name').addClass('done');
              $('.assessment i').removeClass('done');
              $('.assessment_name').removeClass('done');
              $('.settlement i').removeClass('done');
              $('.settlement_name').removeClass('done');
          }
          if (num > 3 && num <= 9) {
              $('.submission i').addClass('done');
              $('.submission_name').addClass('done');
              $('.assessment i').addClass('done');
              $('.assessment_name').addClass('done');
              $('.settlement i').removeClass('done');
              $('.settlement_name').removeClass('done');
          }
          if (num > 9) {
              $('.submission i').addClass('done');
              $('.submission_name').addClass('done');
              $('.assessment i').addClass('done');
              $('.assessment_name').addClass('done');
              $('.settlement i').addClass('done');
              $('.settlement_name').addClass('done');
          }
        }

        // ==== click saveBtn ==> get the updated value, and trigger put api
        $('.approval_down_left .saveBtn').click(function () {
            $('.timeline li div.circle').removeClass('canEdit');
            $('.timeline_editBtn').removeClass('edit');
            $('.timeline').css('border-left', "3px solid #B5B5B5");
            $('.circle').unbind();
            $('.circle').css('cursor', 'default');

            var value = $('.circle.done').length; // get the value of updated status
            console.log(value);
            // === api function


            // ===end
        })
    }])

// the second controller
    .controller('messageCtrl', ['$scope', 'jobService', '$stateParams', 'UserService',
        function ($scope, jobService, $stateParams, UserService) {
            /*get all comments*/
            jobService.getComments($stateParams.jobId)
                .then(function (response) {
                    $scope.comments = response.data.data;
                    var scrollBot = function () {
                        $('.message_wrap').scrollTop($('.message_wrap')[0].scrollHeight);
                        console.log($('.message_wrap')[0].scrollHeight)
                    };
                    setTimeout(scrollBot(), 4000)
                }, function (e) {
                });
            /*get current user*/
            UserService.getCurrentUser()
                .then(function (response) {
                    $scope.user = response.data.data;
                }, function (e) {
                });
            $scope.comment = '';
            $scope.makeComment = function () {
                jobService.makeComment($stateParams.jobId, {content: $scope.comment})
                    .then(function (response) {
                        if (response.status == 200) {
                            $scope.comment = '';
                            jobService.getComments($stateParams.jobId)
                                .then(function (response) {
                                    $scope.comments = response.data.data;
                                }, function (e) {
                                });
                            swal("Success!", "Comment added", "success");
                            $('.message_wrap').scrollTop($('.message_wrap')[0].scrollHeight);
                            console.log($('.message_wrap')[0].scrollHeight)
                        }
                    }, function (e) {
                        swal("Oops...", "Something went wrong! Update failed", "error");
                    })
            };

            $(function () {
                var scrollBot = function () {
                    $('.message_wrap').scrollTop($('.message_wrap')[0].scrollHeight);
                    console.log($('.message_wrap')[0].scrollHeight)
                };
                setTimeout(scrollBot(), 4000)
            });
        }]);
