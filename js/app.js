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
        otherwise({
            redirectTo: '/home'
        });
  }]);


firstapp.filter('imagepath', function () {
    return function (input) {
        if (input == "") {
            return "http://mafiawarloots.com/foranyinformation/assets/img/default.jpg";
        } else {
            return "http://mafiawarloots.com/foranyinformation/uploads/" + input;
        }
    };
});

firstapp.filter('imagepath1', function () {
    return function (input) {
        if (input == "") {
            return "http://mafiawarloots.com/anyinform/assets/img/default.jpg";
        } else {
            return "http://mafiawarloots.com/anyinform/lib/images/" + input;
        }
    };
});

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