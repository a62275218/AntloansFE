antloans.controller('createBlogCtrl',['$scope', '$state', '$http', 'API_BASE','OAuthService',
    function($scope, $state, $http, API_BASE, OAuthService){
      var vm = this;

      //customize input
      $scope.tinymceOptions = {
          selector: '.comment_input',
          height: 150,
          menubar: false,
          /*entity_encoding:'raw',*/
          plugins: [
              'advlist autolink lists charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'emoticons',
              'image imagetools'
          ],
          toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | emoticons | image' ,
          content_css: [
              '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
              '//www.tinymce.com/css/codepen.min.css']
      }

      // create a new blog
      $scope.addBlog = function () {
          if($scope.blog_content === undefined || $scope.blog_title === undefined){
              swal("Oops...", "Please input title and content", "error");
          }else {
                  $http({
                      method:'POST',
                      url:API_BASE+"/posts",
                      headers:{
                          'Authorization':'Bearer'+ OAuthService.getToken()
                      },
                      data:{post_content: $scope.blog_content,
                            post_title: $scope.blog_title}
                  }).then(function (response) {
                      if (response.status == 200) {
                          $scope.blog_content="";
                          $scope.blog_title="";
                          swal("Success!", "Blog added", "success");
                          $scope.toBlogList = function () {
                              $state.go('blog-list');
                          };
                          $scope.toBlogList();
                      }
                  }, function (e) {
                      swal("Oops...", "Something went wrong! Update failed", "error");
                  })
          }
      };

}]);
