antloans.factory('paginationService',[
    function(){
        return{
            numberOfPages:function(length,pageSize){
                return Math.ceil(length/pageSize);
            },
            sortByAttr:function(attr,desc){
                return function(a,b){
                    if(angular.isString(a[attr])){
                        return desc == false? a[attr].localeCompare(b[attr]):b[attr].localeCompare(a[attr]);
                    }
                    return desc == false? (a[attr]<b[attr]):(a[attr]>b[attr]);
                };
            }
        }
}]);