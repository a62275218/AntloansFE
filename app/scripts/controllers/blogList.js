antloans.controller('blogListCtrl',['$scope', '$state', '$http', 'API_BASE','OAuthService', 'paginationService',
    function($scope, $state, $http, API_BASE, OAuthService, paginationService){
      var vm = this;
      $scope.currentPage=0;

      // go to indiviual blog
      $scope.toBlog = function (id) {
          $state.go('blog', {blogId: id});
      };

      /*options of page amount*/
      $scope.pageAmount =[
          {"name":10},
          {"name":20},
          {"name":30}
      ];

      /*default page amount*/
      $scope.pageAmount.selected = $scope.pageAmount[0];

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
      };

      // get all posts/blogs
      $scope.getAllBlogs = function(){
        $http.get(API_BASE + '/posts',
            {
                headers: {
                    'Authorization': 'Bearer' + OAuthService.getToken()
                }
            }
        ).then(function(response){
           $scope.blogs = response.data.data;
           $scope.totalPage = paginationService.numberOfPages($scope.blogs.length,$scope.pageAmount.selected.name);
        },
        function (e) {
            console.log(e)
        });
      }
      $scope.getAllBlogs();



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
