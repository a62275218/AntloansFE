antloans.controller('approvalCtrl', ['$scope', 'jobService', '$stateParams', 'UserService',
    function ($scope, jobService, $stateParams, UserService) {
        var vm = this;
        var deal_status_value = '';
        vm.checkStatus = function (obj) {
            if (obj.deal_status) {
                return obj.deal_status.value;
            }
        };

        $scope.status = [];
        $scope.newStatus = [];
        //convert status value to index
        vm.convertStatus = function (obj, index) {
            angular.forEach(obj, function (v, k) {
                if (v.dealStatus.value == index) {
                    console.log(v);
                    $scope.newStatus[index] = v;
                }
            });
        };
        //  get the status value of current deal
        vm.getJob = function () {
            jobService.getaJob($stateParams.jobId)
                .then(function (response) {
                    $scope.job = response.data.data;
                    $scope.status = response.data.data.deal_status_log;
                    for (var i = 1; i < 13; i++) {
                        vm.convertStatus($scope.status, i)
                    }
                    deal_status_value = vm.checkStatus($scope.job);
                    vm.showStatus(deal_status_value);
                }, function (e) {
                });
        };
        vm.getJob();


        //get all users except customer
        vm.getUsers = function () {
            UserService.getAllUsers()
                .then(function (response) {
                    $scope.admins = [];
                    $scope.supervisors = [];
                    $scope.users = response.data.data;
                    for (var i = 0; i < $scope.users.length; i++) {
                        if ($scope.users[i].role == 'admin') {
                            $scope.admins.push($scope.users[i])
                        } else if ($scope.users[i].role == 'supervisor') {
                            $scope.supervisors.push($scope.users[i])
                        }
                    }
                    console.log($scope.admins);
                }, function (e) {
                })
        };
        vm.getUsers();
        //initiate selection status
        $scope.selection = [];
        $scope.user = [];
        $scope.selection[0] = "origin";
        $scope.selection[1] = "origin";
        //show all the users for selection
        $scope.showUser = function (index) {
            $scope.selection[index] = "select";
        };
        //show the selected user information
        $scope.showUserInfo = function (index, type, id) {
            if (type == 'admin') {
                UserService.addUserToDeal($stateParams.jobId, {admin_id: id})
                    .then(function (response) {
                        if (response.status == 200) {
                            swal("Success!", "User added", "success");
                            $scope.selection[index] = "selected";
                        }
                    }, function (e) {
                        swal("Oops...", "Something went wrong! Update failed", "error");
                    })
            } else if (type == 'supervisor') {
                UserService.addUserToDeal($stateParams.jobId, {supervisor_id: id})
                    .then(function (response) {
                        if (response.status == 200) {
                            swal("Success!", "User added", "success");
                            $scope.selection[index] = "selected";
                        }
                    }, function (e) {
                        swal("Oops...", "Something went wrong! Update failed", "error");
                    })
            }
        };

        // show status in the timeline
        vm.showStatus = function (deal_status_value) {
            var status = [];
            status.push($('.circle.1'), $('.circle.2'), $('.circle.3'), $('.circle.4'), $('.circle.5'),
                $('.circle.6'), $('.circle.7'), $('.circle.8'), $('.circle.9'), $('.circle.10'),
                $('.circle.11'), $('.circle.12'));
            status[deal_status_value - 1].addClass('done');
            var index = parseInt(deal_status_value - 1);
            if (status[deal_status_value - 1].hasClass("done")) {
                for (var i = 0; i < index; i++) {
                    status[i].addClass('done');
                }
                for (var j = index + 1; j < status.length; j++) {
                    status[j].removeClass('done');
                }
                updateStatusLight();
            }
        };

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
                    role: 'customer',
                    preferred_time: $scope.job.preferred_time,
                    preferred_method: $scope.job.preferred_method
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
        function updateStatusLight() {
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
            jobService.updateJob($stateParams.jobId, {deal_status: value})
                .then(function (response) {
                    if (response.status == 200) {
                        swal("Success!", "Status updated", "success");
                        vm.getJob();
                    }
                }, function (e) {
                    swal("Oops...", "Something went wrong! Update failed", "error");
                });
            // ===end
        });

        /*message part*/

        //classify comments
        $scope.commentAmount = [];
        vm.countComments = function(obj,index){
            var sum = 0;
            angular.forEach(obj,function(v,k){
                if(v.deal_status.value == index){
                    sum ++;
                }
            });
            $scope.commentAmount[index] = sum;
        };
        //get all comments
        jobService.getComments($stateParams.jobId)
            .then(function (response) {
                $scope.comments = response.data.data;
                for(var i=1; i<13; i++){
                    vm.countComments($scope.comments,i);
                }
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


