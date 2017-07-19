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
                        if(item[prop]) {
                            if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                                itemMatches = true;
                                break;
                            }
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
            var progress = [];
            var assessment = [];
            var settlement = [];
            if (status == 'submission') {
                angular.forEach(items, function (v, k) {
                        if (items[k].deal_status && items[k].deal_status.value < 6) {
                            submission.push(items[k]);
                        }
                    }
                );
                return submission;
            }
            if (status == 'progress') {
                angular.forEach(items, function (v, k) {
                        if (items[k].deal_status && items[k].deal_status.value >= 6 && items[k].deal_status.value < 10) {
                            submission.push(items[k]);
                        }
                    }
                );
                return submission;
            }
            if (status == 'assessment') {
                angular.forEach(items, function (v, k) {
                    if (items[k].deal_status && items[k].deal_status.value >= 10 && items[k].deal_status.value < 17) {
                        assessment.push(items[k]);
                    }
                });
                return assessment;
            }
            if (status == 'settlement') {
                angular.forEach(items, function (v, k) {
                        if (items[k].deal_status && items[k].deal_status.value >= 17) {
                            settlement.push(items[k]);
                        }
                    }
                );
                return settlement;
            }
            if (status == 'all') {
                return items;
            }
        }
    })
    .filter('bankFilter', function () {
        return function (items, search) {
            var result = [];
            var length = 0;
            if (search == 'all') {
                return items;
            } else {
                angular.forEach(items, function (v, k) {
                    if (v.bank && (v.bank.id == search)) {
                        result.push(v);
                    }
                });
            }
            return result;
        }
    })
    .filter('userFilter', function () {
        return function (items, usertype, id) {
            var result = [];
            if (usertype == 'all') {
                return items;
            } else if (usertype == 'broker') {
                angular.forEach(items, function (v, k) {
                    if (items[k].broker && items[k].broker.user_id == id) {
                        result.push(items[k]);
                    }
                });
            }else if (usertype == 'admin'){
                angular.forEach(items, function (v, k) {
                    if (items[k].admin && items[k].admin.user_id == id) {
                        result.push(items[k]);
                    }
                });
            }
            return result;
        }
    })
    .filter('userTypeFilter',function(){
        return function(items,usertype){
            var result = [];
            if(usertype == 'all'){
                return items;
            }else{
                angular.forEach(items, function (v, k) {
                    if (items[k].role && items[k].role == usertype) {
                        result.push(items[k]);
                    }
                });
            }
            return result;
        }
    })
    .filter('dateFilter', function () {
        return function (items, start, end) {
            var result = [];
            if(start!='') {
                var start_time = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
            }
            if(end!='') {
                var end_time = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
            }
            if (start != '' && end != '') {
                angular.forEach(items, function (v, k) {
                    if(v.settlement_date && v.settlement_date >= start_time && v.settlement_date <= end_time){
                        result.push(v);
                    }
                    /*if (items[k].deal_status && items[k].deal_status.value > 9 && items[k].deal_status_log) {
                        for (var i = 0; i < items[k].deal_status_log.length; i++) {
                            if (items[k].deal_status_log[i].dealStatus.value == 10) {
                                var targetDate = new Date(items[k].deal_status_log[i].createAt);
                                if (targetDate >= start && targetDate <= end) {
                                    result.push(items[k]);
                                }
                            }
                        }
                    }*/
                });
                return result;
            }
            if (start == '' || end == '') {
                return items;
            }
        }
    })
    .directive('currency', function () {
        return {
            require: 'ngModel',
            link: function (elem, $scope, attrs, ngModel) {
                ngModel.$formatters.push(function (val) {
                    return '$' + val
                });
                ngModel.$parsers.push(function (val) {
                    return val.replace(/^\$/, '')
                });
            }
        }
    })
    .directive('ngThumb', ['$window', function ($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function (item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function (file) {
                var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function (scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({width: width, height: height});
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }]);
