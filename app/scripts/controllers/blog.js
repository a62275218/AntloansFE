antloans.controller('blogCtrl',['$scope','$state','UserService','$stateParams','API_BASE','$http','OAuthService',
    function($scope,$state,UserService,$stateParams,API_BASE,$http,OAuthService){
        // go to indiviual blog
        $scope.toBlog = function (id) {
            $state.go('blog', {blogId: id});
        };

        $scope.getABlog = function(id){
          $http({
              method: 'GET',
              url: API_BASE + "/posts/" + id,
              headers: {
                  'Authorization': 'Bearer' + OAuthService.getToken()
              }
          }).then(function(response){
             $scope.blog = response.data.data;
          }, function(e){})
        }

        $scope.getABlog($stateParams.blogId);

        // edit the blog
        $scope.blogEdit = function () {
            $("#blogEditBtn").addClass('edit');
            $("#blog_content label input").removeAttr('disabled').removeClass('disable');
            $("#blog_content p.blog_show").hide();
            $("#blog_content div.blog_edit").show();
        }

        $scope.saveBlog = function(id){
          $http({
              method: 'PUT',
              url: API_BASE + "/posts/" + id,
              headers: {
                  'Authorization': 'Bearer' + OAuthService.getToken()
              },
              data:{post_content: $scope.blog.postContent,
                    post_title: $scope.blog.postTitle}
          }).then(function(response){
            if (response.status == 200) {
                $("#blogEditBtn").removeClass('edit');
                $("#blog_content label input").attr('disabled');
                $("#blog_content label input").addClass('disable');
                $("#blog_content p.blog_show").show();
                $("#blog_content div.blog_edit").hide();
                swal("Success!", "Blog saved", "success");
            }
          },function(e){
            swal("Oops...", "Something went wrong! Update failed", "error");
          })
        }

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
