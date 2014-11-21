
var adminurl="http://mafiawarloots.com/foranyinformation/index.php/json/";

var restservice = angular.module('restservice', [])

.factory('RestService', function ($http) {
   
    return {
        getsubcategory: function(id){
            return $http.get(adminurl+"getsubcategory?id="+id,{});
        },
        logout: function(){
            return $http.get(adminurl+"logout",{});
        },
        authenticate: function(){
            return $http.get(adminurl+"authenticate",{});
        },
        getlistingbycategory: function(id){
            return $http.get(adminurl+"getlistingbycategory?id="+id,{});
        },
        enquiryuser: function(name,listing,email,phone,comment){
            return $http.get(adminurl+"enquiryuser?name="+name+"&listing="+listing+"&email="+email+"&phone="+phone+"&type=2&comment="+comment,{});
        },
        getonelistingbyid: function(id){
            return $http.get(adminurl+"getonelistingbyid?id="+id,{});
        },
        searchcategory: function(search){
            return $http.get(adminurl+"searchcategory?categoryname="+search,{});
        },
        login: function(email,password){
            return $http.get(adminurl+"login?email="+email+"&password="+password,{});
        },
        getallcity: function(search){
            return $http.get(adminurl+"getallcity",{});
        },
        getallparentcategories: function(search){
            return $http.get(adminurl+"getallparentcategories",{});
        },
        getfilter: function(id){
            return $http.get(adminurl+"getfilter?id="+id,{});
        },
        viewonecitylocations: function(id){
            return $http.get(adminurl+"viewonecitylocations?id="+id,{});
        },
        signup: function(email,password){
            return $http.get(adminurl+"signup?email="+email+"&password="+password,{});
        }

    }
});