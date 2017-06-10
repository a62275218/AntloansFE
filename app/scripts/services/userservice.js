antloans.factory('UserService',['$http',
    function($http){
    return{
        resetPassword: function(token,password){
            return $http.post('reset',{
                token:token,
                password:password
            }).then(function(r){
                console.log(r)
            },function(e){
                console.log(e)
            })
        }
    }
}]);