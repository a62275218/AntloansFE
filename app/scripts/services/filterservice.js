antloans
    .filter('rangeFilter', function () {
        return function (items, attr, min, max) {
            var range = [],
                min = parseFloat(min),
                max = parseFloat(max);
            if (items) {
                for (var i = 0, l = items.length; i < l; ++i) {
                    var item = items[i];
                    if (item[attr] <= max && item[attr] >= min) {
                        range.push(item);
                    }
                }
            }
            return range;
        }
    })
    .filter('startFrom', function () {
        return function (input, start) {
            if (input) {
                start = +start; //parse to int
                return input.slice(start);
            }
        }
    })
    .filter('propsFilter', function () {
        return function (items, props) {
            var out = [];

            if (angular.isArray(items)) {
                var keys = Object.keys(props);

                items.forEach(function (item) {
                    var itemMatches = false;

                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }
            return out;
        };
    })
    .filter('statusFilter', function () {
        return function (items, status) {
            var submission = [];
            var assessment = [];
            var settlement = [];
            if (status == 'submission') {
                angular.forEach(items, function (v, k) {
                       if (items[k].deal_status && items[k].deal_status.value < 4) {
                            submission.push(items[k]);
                        }
                    }
                );
                return submission;
            }
            if(status == 'assessment'){
                angular.forEach(items, function (v, k) {
                        if (items[k].deal_status && items[k].deal_status.value >=4 && items[k].deal_status.value<10) {
                            assessment.push(items[k]);
                        }
                    }
                );
                return assessment;
            }
            if(status == 'settlement'){
                angular.forEach(items, function (v, k) {
                        if (items[k].deal_status && items[k].deal_status.value >=10) {
                            settlement.push(items[k]);
                        }
                    }
                );
                return settlement;
            }
            if(status == 'all'){
                return items;
            }
        }
    });