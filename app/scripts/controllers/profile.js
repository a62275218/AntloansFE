antloans.controller('userProfileCtrl',['$scope','response','FileUploader','API_BASE','OAuthService','UserService', 'paginationService',
    function($scope,response,FileUploader,API_BASE,OAuthService,UserService,paginationService){
        if (response && response.status == 200 && response.data.success) {
            $scope.user = response.data.data;
            console.log("1111111111111");
            console.log($scope.user);
        }
        //initiate uploader
        $scope.uploader = new FileUploader({
            alias:'qqfile',
            queueLimit:1,
            method:'PUT',
            removeAfterUpload:true,
            url:API_BASE + "/users/"+ $scope.user.user_id +"/avatar",
            headers:{'Authorization': 'Bearer' + OAuthService.getToken()}
        });
        $scope.dateOptions = {
            changeYear: true,
            changeMonth: true,
            yearRange:"1800:2100"
        };

        //limit to images
        $scope.uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        $scope.uploader.onErrorItem = function(item,response,status,headers){
            swal("Oops...", "Something went wrong! Upload failed", "error");
        };
        $scope.uploader.onSuccessItem = function(item,response,status,headers){
            swal("Success!", "Avatar uploaded", "success")
        };

    $scope.edit = function(){
      $('.saveBtn').show();
      $('.editBtn').addClass('edit');
      $('.personal_detail input').removeAttr('disabled').removeClass('disable');
    };

    //reset password
        $scope.newPass = '';
        $scope.RenewPass = '';

    $scope.reset = false;
    $scope.resetPass = function(){
        if($scope.reset == false) {
            $scope.reset = true;
        }else{
            $scope.reset = false;
            $scope.newPass = '';
            $scope.RenewPass = '';
        }
    };
    /*$scope.$watchGroup(['newPass','repeat_pass'],function(){
       if($scope.newPass != $scope.RenewPass){
           $scope.match = false;
       }else {
           $scope.match = true;
       }
    });*/
    //get user jobs
    UserService.getUserJobs($scope.user.user_id)
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



    //submit change
    $scope.save = function() {
        $scope.user.dob = Date.UTC($scope.user.date_of_birth.getFullYear(), $scope.user.date_of_birth.getMonth(), $scope.user.date_of_birth.getDate());
        if ($scope.newPass != $scope.RenewPass) {
            swal("Oops...", "Please Input the same password", "error");
        }else if($scope.reset == true && ($scope.newPass == '' || $scope.RenewPass =='')){
            swal("Oops...", "Please Input password", "error");
        }else {
            $('.personal_detail input').attr('disabled');
            $('.personal_detail input').addClass('disable');
            $('.pass').attr('');
            $('.pass').removeClass('disable');
            UserService.updateUser($scope.user.user_id, {
                firstName: $scope.user.first_name,
                lastName: $scope.user.last_name,
                email: $scope.user.email,
                phone: $scope.user.phone,
                mobile: $scope.user.mobile,
                password: $scope.newPass,
                preferred_time: $scope.user.preferred_time,
                preferred_method: $scope.user.preferred_method,
                date_of_birth:$scope.user.dob
            }).then(function () {
                swal("Success!", "User uploaded", "success")
                $scope.reset = false;
                $scope.newPass = '';
                $scope.RenewPass = '';
            }, function (e) {
                swal("Oops...", "Something went wrong! Update failed", "error");
            })
        }
        $('.editBtn').removeClass('edit');
        $('.saveBtn').hide();
    }
}]);
