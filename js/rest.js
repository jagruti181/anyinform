
var adminurl="http://mafiawarloots.com/foranyinformation/index.php/json/";

var restservice = angular.module('restservice', [])

.factory('RestService', function ($http) {
   
    return {
        getsubcategory: function(id){
            return $http.get(adminurl+"getsubcategory?id="+id,{});
        },
        getlistingbycategory: function(id){
            return $http.get(adminurl+"getlistingbycategory?id="+id,{});
        },
        getonelistingbyid: function(id){
            return $http.get(adminurl+"getonelistingbyid?id="+id,{});
        },
        searchcategory: function(search){
            return $http.get(adminurl+"searchcategory?categoryname="+search,{});
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