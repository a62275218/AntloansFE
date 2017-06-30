antloans.controller('blogListCtrl',['$scope', '$state',
    function($scope, $state){
      var vm = this;
      $scope.blog='';

      // go to indiviual blog
      $scope.toBlog = function (id) {
          $state.go('blog', {blogId: id});
      };

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

}]);