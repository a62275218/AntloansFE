antloans.controller('userProfileCtrl',['$scope','response','FileUploader','API_BASE','OAuthService',
    function($scope,response,FileUploader,API_BASE,OAuthService){
        if (response && response.status == 200 && response.data.success) {
            $scope.user = response.data.data;
            console.log($scope.user);
        }
        //initiate uploader
        $scope.uploader = new FileUploader({
            alias:'qqfile',
            queueLimit:1,
            method:'PUT',
            removeAfterUpload:true,
            url:API_BASE + "/users/4/avatar",
            headers:{'Authorization': 'Bearer' + OAuthService.getToken()}
        });

        //limit to images
        $scope.uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });
        console.log($scope.uploader);

        $scope.uploader.onErrorItem = function(item,response,status,headers){
            swal("Oops...", "Something went wrong! Upload failed", "error");
        };
        $scope.uploader.onSuccessItem = function(item,response,status,headers){
            swal("Success!", "Avatar uploaded", "success")
        };

    $scope.edit = function(){
      $('.personal_detail input').removeAttr('disabled').removeClass('disable');
    }
    $scope.save = function(){
      $('.personal_detail input').attr('disabled');
      $('.personal_detail input').addClass('disable');
    }
}]);
