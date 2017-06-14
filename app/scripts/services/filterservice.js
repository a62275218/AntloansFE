antloans
    .filter('rangeFilter', function () {
        return function (items, attr, min, max) {
            var range = [],
                min = parseFloat(min),
                max = parseFloat(max);
            if(items) {
                for (var i = 0, l = items.length; i < l; ++i) {
                    var item = items[i];
                    if (item[attr] <= max && item[attr] >= min) {
                        range.push(item);
                    }
                }
            }
            return range;
        }
    });