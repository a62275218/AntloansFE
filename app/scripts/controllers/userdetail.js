antloans.controller('userDetailCtrl', ['$scope', '$state', 'UserService', '$stateParams','paginationService',
    function ($scope, $state, UserService, $stateParams,paginationService) {
        //get user info
        UserService.getaUser($stateParams.userId)
            .then(function (response) {
                $scope.user = response.data.data;
            }, function (e) {
            });
        $scope.dateOptions = {
            changeYear: true,
            changeMonth: true,
            yearRange:"1800:2100"
        };
        //get user jobs
        UserService.getUserJobs($stateParams.userId)
            .then(function (response) {
                $scope.job = response.data.data.content;
                UserService.findFullName($scope.job);
                $scope.totalPage = paginationService.numberOfPages($scope.job.length,$scope.pageAmount.selected.name);
            }, function (e) {
            });

            /*set default current page*/
            $scope.currentPage = 0;

            /*go to next page*/
            $scope.nextPage = function(){
                $scope.currentPage++;
                if($scope.currentPage>$scope.totalPage-1){
                    $scope.currentPage = $scope.totalPage-1
                }
            };
            /*go to previous page*/
            $scope.prevPage = function(){
                $scope.currentPage--;
                if($scope.currentPage < 0){
                    $scope.currentPage = 0
                }
            };
            /*go to first page*/
            $scope.returnToFirst = function(){
                $scope.currentPage = 0;
                $scope.totalPage = paginationService.numberOfPages($scope.job.length,$scope.pageAmount.selected.name);

            };
            /*options of page amount*/
            $scope.pageAmount =[
                {"name":10},
                {"name":20}
            ];
            /*default page amount*/
            $scope.pageAmount.selected = $scope.pageAmount[0];

        //sort job
        $scope.sort = '';
        $scope.desc = false;

        $scope.sortObj = function(sort,obj){
            $('th').removeClass('selected');
            if($(obj.target).is("i")){
                if($(obj.target).hasClass("false")){
                    $(obj.target).removeClass('fa-caret-up');
                    $(obj.target).addClass('fa-caret-down');
                    $(obj.target).removeClass("false");
                    $(obj.target).addClass("true");
                    $scope.desc = true;
                }else{
                    $(obj.target).removeClass("true");
                    $(obj.target).addClass("false");
                    $(obj.target).removeClass('fa-caret-down');
                    $(obj.target).addClass('fa-caret-up');
                    $scope.desc = false;
                };
                $scope.sort = sort;
                $(obj.target).parent().addClass('selected');
            }else{
                if($(obj.target).children().hasClass("false")){
                    $(obj.target).children().removeClass('fa-caret-up');
                    $(obj.target).children().addClass('fa-caret-down');
                    $(obj.target).children().removeClass("false");
                    $(obj.target).children().addClass("true");
                    $scope.desc = true;
                }else{
                    $(obj.target).children().removeClass("true");
                    $(obj.target).children().addClass("false");
                    $(obj.target).children().removeClass('fa-caret-down');
                    $(obj.target).children().addClass('fa-caret-up');
                    $scope.desc = false;
                }
                $scope.sort = sort;
                $(obj.target).addClass('selected');
            }
        };
        //go to approval
        $scope.toApproval =function(id){
            $state.go('approval',{jobId:id})
        };

        $scope.edit = function () {
          $('.saveBtn').show();
          $('.editBtn').addClass('edit');
          $('.personal_detail input').removeAttr('disabled').removeClass('disable');
        };
        $scope.save = function () {
            $scope.user.dob = Date.UTC($scope.user.date_of_birth.getFullYear(), $scope.user.date_of_birth.getMonth(), $scope.user.date_of_birth.getDate());
            $('.personal_detail input').attr('disabled');
            $('.personal_detail input').addClass('disable');
            UserService.updateUser($scope.user.user_id, {
                firstName: $scope.user.first_name,
                lastName: $scope.user.last_name,
                email: $scope.user.email,
                phone: $scope.user.phone,
                mobile: $scope.user.mobile,
                preferred_time: $scope.user.preferred_time,
                preferred_method: $scope.user.preferred_method,
                date_of_birth:$scope.user.dob
            }).then(function () {
                swal("Success!", "User uploaded", "success");
                $('.editBtn').removeClass('edit');
                $('.saveBtn').hide();
            }, function (e) {
                swal("Oops...", "Something went wrong! Update failed", "error");
            })
        }


    }]);
