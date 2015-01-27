// JavaScript Document
var firstapp = angular.module('firstapp', [
  'ngRoute',
    'restservice',
  'phonecatControllers',
  'templateservicemod',
    'ui.bootstrap',
    'ui.utils'
    
]);

firstapp.config(['$routeProvider',
                 function ($routeProvider, $routeParams) {
                     $routeProvider.
        when('/home', {
            templateUrl: 'views/template.html',
            controller: 'home'
        }).
        when('/category/:id', {
            templateUrl: 'views/template.html',
            controller: 'category'
        }).
        when('/subcategory/:id', {
            templateUrl: 'views/template.html',
            controller: 'subcategory'
        }).
        when('/detail/:id', {
            templateUrl: 'views/template.html',
            controller: 'detail'
        }).
        when('/listbusiness', {
            templateUrl: 'views/template.html',
            controller: 'listbusiness'
        }).
        when('/about', {
            templateUrl: 'views/template.html',
            controller: 'about'
        }).
        when('/page/:id', {
            templateUrl: 'views/page.html',
            controller: 'page'
        }).
        when('/signup', {
            templateUrl: 'views/template.html',
            controller: 'signup'
        }).
        when('/login', {
            templateUrl: 'views/template.html',
            controller: 'login'
        }).
        when('/portfolio', {
            templateUrl: 'views/template.html',
            controller: 'portfolio'
        }).
        when('/contact', {
            templateUrl: 'views/template.html',
            controller: 'contact'
        }).
        when('/profile', {
            templateUrl: 'views/template.html',
            controller: 'profile'
        }).
        otherwise({
            redirectTo: '/home'
        });
  }]);


firstapp.filter('imagepath', function () {
    return function (input) {
        if (input == "") {
            return "http://mafiawarloots.com/foranyinformation/assets/img/default.jpg";
//                        return "http://localhost/foranyinformation/assets/img/default.jpg";
        } else {
            return "http://mafiawarloots.com/foranyinformation/uploads/" + input;
//            return "http://localhost/foranyinformation/uploads/" + input;
        }
    };
});

firstapp.filter('imagepath2', function () {
    return function (input) {
        if (input == "") {
            return "http://mafiawarloots.com/anyinform/assets/img/default.jpg";
//          return "http://localhost/foranyinformation/assets/img/default.jpg";
        } else {
            return "http://mafiawarloots.com/anyinform/lib/images/" + input;
//          return "http://localhost/foranyinformation/uploads/" + input;
        }
    };
});

firstapp.filter('imagepath1', function () {
    return function (input) {
        if (input == "") {
            return "http://mafiawarloots.com/foranyinformation/assets/img/default.jpg";
//            return "http://localhost/foranyinformation/assets/img/default.jpg";
        } else {
            return "http://mafiawarloots.com/foranyinformation/lib/images/" + input;
//            return "http://localhost/foranyinformation/lib/images/" + input;
        }
    };
});



// start angular map directive

// end angular map directive


var rad = function(x) {
    return x * Math.PI / 180;
};

var formvalidation = function(allvalidation) {
            var isvalid2 = true;
            for (var i = 0; i < allvalidation.length; i++) {
                console.log("checking");
                console.log(allvalidation[i].field);
                if (allvalidation[i].field == "" || !allvalidation[i].field) {
                    allvalidation[i].validation = "ng-dirty";
                    isvalid2 = false;
                }
            }
            return isvalid2;
        };





var getDistance = function(lat1,long1,lat2,long2) {
    var R = 6378.137; // Earth’s mean radius in km
    var p1={lat:lat1,lng:long1};
    var p2={lat:lat2,lng:long2};
    
    var dLat = rad(p2.lat - p1.lat);
    var dLong = rad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in km
};
var cat=[];
var addcategory = function (data){
    console.log(data);
    cat.push(data.name);
    console.log(cat);
}

firstapp.directive("treeModel", function ($compile) {
        return {
            restrict: "A",
            link: function (a, g, c) {
                var e = c.treeModel,
                    h = c.nodeLabel || "label",
                    d = c.nodeChildren || "children",
                    k = '<ul><li data-ng-repeat="node in ' + e + '"><i class="collapsed" data-ng-init="node.collapsed=true" data-ng-show="node.' + d + '.length && node.collapsed" data-ng-click="selectNodeHead(node, $event)"></i><i class="expanded" data-ng-show="node.' + d + '.length && !node.collapsed" data-ng-click="selectNodeHead(node, $event)"></i><i class="normal" data-ng-hide="node.' +
                    d + '.length"></i> <span data-ng-class="node.selected" data-ng-click="selectNodeLabel(node, $event)">{{node.' + h + '}}</span><div data-ng-hide="node.collapsed" data-tree-model="node.' + d + '" data-node-id=' + (c.nodeId || "id") + " data-node-label=" + h + " data-node-children=" + d + "></div></li></ul>";
                e && e.length && (c.angularTreeview ? (a.$watch(e, function (m, b) {
                    g.empty().html($compile(k)(a))
                }, !1), a.selectNodeHead = a.selectNodeHead || function (a, b) {
                    b.stopPropagation && b.stopPropagation();
                    b.preventDefault && b.preventDefault();
                    b.cancelBubble = !0;
                    b.returnValue = !1;
                    a.collapsed = !a.collapsed
                }, a.selectNodeLabel = a.selectNodeLabel || function (c, b) {
                    b.stopPropagation && b.stopPropagation();
                    b.preventDefault && b.preventDefault();
                    b.cancelBubble = !0;
                    b.returnValue = !1;
                    a.currentNode && a.currentNode.selected && (a.currentNode.selected = void 0);
                    c.selected = "selected";
                    a.currentNode = c
                }) : g.html($compile(k)(a)))
            }
        }
    });