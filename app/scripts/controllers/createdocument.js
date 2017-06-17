antloans.controller('createDocument',['$scope', 'FileUploader','OAuthService','API_BASE',
    function($scope, FileUploader,OAuthService,API_BASE){
        $scope.uploader = new FileUploader({
            method:'PUT',
            url:API_BASE + "/documents/",
            headers:{'Authorization': 'Bearer' + OAuthService.getToken()}
        });
        $scope.uploader.onErrorItem = function(item,response,status,headers){
            swal("Oops...", "Something went wrong! Upload failed", "error");
        };
        $scope.uploader.onSuccessItem = function(item,response,status,headers){
            swal("Success!", "All files uploaded", "success")
        }
    }
]);