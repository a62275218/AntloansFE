antloans.controller('createDocument',['$scope', 'FileUploader',
    function($scope, FileUploader){
        $scope.uploader = new FileUploader();
    }
]);