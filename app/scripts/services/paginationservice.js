antloans.factory('paginationService',[
    function(){
        return{
            numberOfPages:function(length,pageSize){
                return Math.ceil(length/pageSize);
            }
        }
}]);