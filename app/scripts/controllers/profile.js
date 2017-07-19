antloans.controller('userProfileCtrl',['$scope','response','FileUploader','API_BASE','OAuthService','UserService',
    function($scope,response,FileUploader,API_BASE,OAuthService,UserService){
        if (response && response.status == 200 && response.data.success) {
            $scope.user = response.data.data;
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
//
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
            if($scope.reset == true){
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
                swal("Success!", "User updated", "success");
                $scope.reset = false;
                $scope.newPass = '';
                $scope.RenewPass = '';
            }, function (e) {
                swal("Oops...", "Something went wrong! Update failed", "error");
            })
            }else{
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
                    swal("Success!", "User updated", "success");
                    $scope.reset = false;
                    $scope.newPass = '';
                    $scope.RenewPass = '';
                }, function (e) {
                    swal("Oops...", "Something went wrong! Update failed", "error");
                })
            }
        }
        $('.editBtn').removeClass('edit');
        $('.saveBtn').hide();
    }
}]);
