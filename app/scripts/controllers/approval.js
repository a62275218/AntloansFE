antloans.controller('approvalCtrl', ['$scope', 'jobService', '$stateParams', 'UserService', '$anchorScroll', '$location', '$timeout', '$q', 'BankService',
    function ($scope, jobService, $stateParams, UserService, $anchorScroll, $location, $timeout, $q, BankService) {
        var vm = this;

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
                    $scope.status = $scope.job.deal_status_log;
                    if ($scope.job.admin) {
                        $scope.selection[0] = 'settled';
                    }
                    if ($scope.job.supervisor) {
                        $scope.selection[1] = 'settled';
                    }
                    if ($scope.job.broker) {
                        $scope.selection[2] = 'settled';
                    }
                    for (var i = 1; i < 12; i++) {
                        vm.convertStatus($scope.status, i)
                    }
                    vm.showStatus($scope.job.deal_status.value);
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
                    $scope.brokers = [];
                    $scope.users = response.data.data;
                    for (var i = 0; i < $scope.users.length; i++) {
                        if ($scope.users[i].role == 'admin') {
                            $scope.admins.push($scope.users[i]);
                        } else if ($scope.users[i].role == 'supervisor') {
                            $scope.supervisors.push($scope.users[i])
                        } else if ($scope.users[i].role == 'broker') {
                            $scope.brokers.push($scope.users[i])
                        }
                    }
                }, function (e) {
                })
        };
        vm.getUsers();
        //initiate selection status
        $scope.selection = [];
        $scope.user = [];
        $scope.selection[0] = "origin";
        $scope.selection[1] = "origin";
        $scope.selection[2] = "origin";
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
            } else if (type == 'broker') {
                UserService.addUserToDeal($stateParams.jobId, {broker_id: id})
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
        $scope.editUser = function (index) {
            $scope.selection[index] = 'origin';
        };

        // show status in the timeline
        vm.showStatus = function (deal_status_value) {
            var status = [];
            status.push($('.circle.1'), $('.circle.2'), $('.circle.3'), $('.circle.4'), $('.circle.5'),
                $('.circle.6'), $('.circle.7'), $('.circle.8'), $('.circle.9'), $('.circle.10'),
                $('.circle.11'));
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
        $scope.updateJob = function () {
            $('.job_show td input').attr('disabled');
            $('.job_show td input').addClass('disable');

            $('.loan_show td input').attr('disabled');
            $('.loan_show td input').addClass('disable');

            $scope.edit = false;

            var p1 = UserService.updateUser($scope.job.client_id,
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
                });
            var p2 = jobService.updateJobInfo($scope.job.id, {
                loan_amount: $scope.job.loan_amount,
                loan_purpose: $scope.job.loan_purpose.value,
                repayment_type: $scope.job.repayment_type.value,
                file_nature: $scope.job.file_nature.value,
                special_note: $scope.job.special_note
            });
            $q.all(p1,p2).then(function (response) {
                console.log(response.$$state);
                if(response.$$state.status == 0){
                    swal("Oops...", "You don't have permission to do that", "error");
                }else {
                    swal("Success!", "Loan updated", "success")
                }
            }, function (e) {
                swal("Oops...", "Something went wrong! Update failed", "error");
            });
            var defer = $q.defer();
            defer.reject(console.log('123'));
        };
        // edit job info
        $scope.edit = false;
        $scope.jobEdit = function () {
            $('.job_show td input').removeAttr('disabled').removeClass('disable');
            $('.loan_show td input').removeAttr('disabled').removeClass('disable');
            $scope.edit = true;
        }

        // ========= edit vertical timeline ========

        $('.timeline_editBtn').click(function () {
            var status = [];
            status.push($('.circle.1'), $('.circle.2'), $('.circle.3'), $('.circle.4'), $('.circle.5'),
                $('.circle.6'), $('.circle.7'), $('.circle.8'), $('.circle.9'), $('.circle.10'),
                $('.circle.11'));

            $('.timeline li div.circle').addClass('canEdit');
            $('.timeline_editBtn').addClass('edit');
            $('.timeline').css('border-left', "3px dotted #B5B5B5");
            $('.circle').css('cursor', 'pointer');
            $('.circle').click(function (e) {
                // prevent change preivous status and skip status
                var num = $('.circle.done').length;
                var index = parseInt($(e.target).attr('data-index'));

                if (index == $scope.job.deal_status.value) {
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
                } else {
                    swal("Oops...", "You cannot change previous or skip any status !", "error");
                }
            });

        });

        // connect the timeline status to above status lights
        function updateStatusLight() {
            var num = $('.circle.done').length;
            if (num < 1) {
                $('.submission i').removeClass('done');
                $('.submission').removeClass('changed');
                $('.submission_name').removeClass('done');
                $('.assessment i').removeClass('done');
                $('.assessment').removeClass('changed');
                $('.assessment_name').removeClass('done');
                $('.settlement i').removeClass('done');
                $('.settlement_name').removeClass('done');
            }
            if (num >= 1 && num <= 3) {
                $('.submission i').addClass('done');
                $('.submission').addClass('changed');
                $('.submission_name').addClass('done');
                $('.assessment i').removeClass('done');
                $('.assessment').removeClass('changed');
                $('.assessment_name').removeClass('done');
                $('.settlement i').removeClass('done');
                $('.settlement_name').removeClass('done');
            }
            if (num > 3 && num <= 9) {
                $('.submission i').addClass('done');
                $('.submission').addClass('changed');
                $('.submission_name').addClass('done');
                $('.assessment i').addClass('done');
                $('.assessment').addClass('changed');
                $('.assessment_name').addClass('done');
                $('.settlement i').removeClass('done');
                $('.settlement_name').removeClass('done');
            }
            if (num > 9) {
                $('.submission i').addClass('done');
                $('.submission').addClass('changed');
                $('.submission_name').addClass('done');
                $('.assessment i').addClass('done');
                $('.assessment').addClass('changed');
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

        //customize input
        $scope.tinymceOptions = {
            selector: '.comment_input',
            height: 150,
            menubar: false,
            /*entity_encoding:'raw',*/
            plugins: [
                'advlist autolink lists charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime table contextmenu paste code',
                'emoticons'
            ],
            toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | emoticons',
            content_css: [
                '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                '//www.tinymce.com/css/codepen.min.css']
        }

        //classify comments
        $scope.commentAmount = [];
        vm.countComments = function (obj, index) {
            var sum = 0;
            angular.forEach(obj, function (v, k) {
                if (v.deal_status.value == index) {
                    sum++;
                }
            });
            $scope.commentAmount[index] = sum;
        };

        $scope.commentFilter =
            [
                {
                    value: 0,
                    label: 'All'
                },
                {
                    value: 1,
                    label: 'Interview conducted'
                },
                {
                    value: 2,
                    label: 'Document collected'
                },
                {
                    value: 3,
                    label: 'Application submitted'
                },
                {
                    value: 4,
                    label: 'Conditional approval'
                },
                {
                    value: 5,
                    label: 'Valuation ordered '
                },
                {
                    value: 6,
                    label: 'Unconditional approval '
                },
                {
                    value: 7,
                    label: 'Docs issued'
                },
                {
                    value: 8,
                    label: 'Signed docs returned'
                },
                {
                    value: 9,
                    label: 'Ready to book'
                },
                {
                    value: 10,
                    label: 'Settled'
                },
                {
                    value: 11,
                    label: 'One month post settlement confirmation'
                }
            ];
        $scope.commentFilter.selected = $scope.commentFilter[0];
        //get all comments
        jobService.getComments($stateParams.jobId)
            .then(function (response) {
                $scope.comments = response.data.data;
                for (var i = 1; i < 13; i++) {
                    vm.countComments($scope.comments, i);
                }
                /*var scrollBot = function () {
                 $('.message_wrap').scrollTop($('.message_wrap')[0].scrollHeight);
                 console.log($('.message_wrap')[0].scrollHeight)
                 };
                 setTimeout(scrollBot(), 5)*/
            }, function (e) {
            });
        /*get current user*/
        UserService.getCurrentUser()
            .then(function (response) {
                $scope.user = response.data.data;
            }, function (e) {
            });
        $scope.comment = '';
        /*vm.htmlDecode = function(value){
         return (typeof value === 'undefined') ? '' : $('<div/>').html(value).text();
         };
         vm.html2Escape = function(sHtml){
         return sHtml.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});
         };*/
        $scope.makeComment = function () {
            /*var con = vm.htmlDecode($scope.comment);*/
            if($scope.comment == ''){
                swal("Oops...", "Please input content", "error");
            }else {
                jobService.makeComment($stateParams.jobId, {content: $scope.comment})
                    .then(function (response) {
                        console.log($scope.comment);
                        if (response.status == 200) {
                            $scope.comment = '';
                            jobService.getComments($stateParams.jobId)
                                .then(function (response) {
                                    $scope.comments = response.data.data;
                                }, function (e) {
                                });
                            swal("Success!", "Comment added", "success");
                            /*var scrollBot = function () {
                             $('.message_wrap').scrollTop($('.message_wrap')[0].scrollHeight);
                             console.log($('.message_wrap')[0].scrollHeight)
                             };
                             $timeout(scrollBot());*/
                        }
                    }, function (e) {
                        swal("Oops...", "Something went wrong! Update failed", "error");
                    })
            }
        };

        $scope.showStatusComment = function (index) {
            $scope.comments = [];
            jobService.getComments($stateParams.jobId)
                .then(function (response) {
                    $scope.comments_tmp = response.data.data;
                    if (index == 0) {
                        $scope.comments = $scope.comments_tmp;
                    }
                    angular.forEach($scope.comments_tmp, function (v, k) {
                        if (v.deal_status.value == index) {
                            $scope.comments.push(v);
                        }
                    });
                    /*var scrollBot = function () {
                     $('.message_wrap').scrollTop($('.message_wrap')[0].scrollHeight);
                     console.log($('.message_wrap')[0].scrollHeight)
                     };
                     $timeout(scrollBot());*/
                }, function (e) {
                });

        };

        //get all the selective attributes
        vm.getBanks = function () {
            BankService.getAllBanks()
                .then(function (response) {
                    $scope.banks = response.data.data;
                }, function (e) {
                })
        };
        $scope.loan_purpose = [];
        vm.getProperty = function () {
            jobService.getJobProperty()
                .then(function (response) {
                    $scope.loan_type = response.data.data.loan_type;
                    $scope.repayment_type = response.data.data.repayment_type;
                    $scope.loan_purpose = response.data.data.loan_purpose;
                    $scope.file_nature = response.data.data.file_nature;
                    $scope.loan_type.shift();
                    $scope.file_nature.shift();
                    $scope.repayment_type.shift();
                    $scope.loan_purpose.shift();
                }, function (e) {
                })
        };
        vm.getBanks();
        vm.getProperty();

    }]);
