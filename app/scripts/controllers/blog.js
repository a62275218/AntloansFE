antloans.controller('blogCtrl',['$scope','$state','UserService','$stateParams','API_BASE','$http','OAuthService',
    function($scope,$state,UserService,$stateParams,API_BASE,$http,OAuthService){
        // go to indiviual blog
        $scope.toBlogList = function () {
            $state.go('blog-list');
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
          if($scope.blog.post_title === '' || $scope.blog.post_content === ''){
              swal("Oops...", "Please input title and content", "error");
          }else {
              $http({
                  method: 'PUT',
                  url: API_BASE + "/posts/" + id,
                  headers: {
                      'Authorization': 'Bearer' + OAuthService.getToken()
                  },
                  data:{post_content: $scope.blog.post_content,
                        post_title: $scope.blog.post_title}
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
        }

        // delete a blog
        $scope.deleteBlog = function(id){
          $http.delete(
              API_BASE + "/posts/" + id, {
              headers: {
                  'Authorization': 'Bearer' + OAuthService.getToken()
              }
            }).then(function(response){
            if (response.status == 200) {
                $("#blogEditBtn").removeClass('edit');
                $("#blog_content label input").attr('disabled');
                $("#blog_content label input").addClass('disable');
                $("#blog_content p.blog_show").show();
                $("#blog_content div.blog_edit").hide();
                swal("Success!", "Blog deleted", "success");
                $scope.toBlogList();
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
                'emoticons',
                'image imagetools'
            ],
            toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | emoticons | image' ,
            content_css: [
                '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                '//www.tinymce.com/css/codepen.min.css']
        }
}]);
