
var adminurl="http://localhost/foranyinformation/index.php/json/";

var restservice = angular.module('restservice', [])

.factory('RestService', function ($http) {
   
    var banner='';
    return {
        getmap: function(data){
            return $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+data+"&key=AIzaSyAj0OXepKIgjTlZiPe_ZVYTDjL8rYpobgQ",{});
        },
        getsubcategory: function(id){
            return $http.get(adminurl+"getsubcategory?id="+id,{});
        },
        logout: function(){
            return $http.get(adminurl+"logout",{});
        },
        getbanner: function(){
            return banner;
        },
        setbanner: function(banner){
            banner = banner;
            return banner;
        },
        getcategoryinfo: function(id){
            return $http.get(adminurl+"getcategoryinfo?id="+id,{});
        },
        getcategorytree: function(){
            return $http.get(adminurl+"getcategorytree",{});
        },
        alladd: function(){
            return $http.get(adminurl+"alladd",{});
        },
        getallcategory: function(){
            return $http.get(adminurl+"getcategoryfront",{});
        },
        createlisting: function(list){
            return $http({
                url: adminurl+"createlisting",
                method: "POST",
               data: {'name':list.name,
                      'category':list.category,
                      'modeofpayment':list.modeofpayment,
                      'daysofoperation':list.daysofoperation,
                      'address':list.address,
                      'pincode':list.pincode,
                      'city':list.city,
                      'state':list.state,
                      'country':list.country,
                      'latitude':list.latitude,
                      'longitude':list.longitude,
                      'description':list.description,
                      'contact':list.contact,
                      'email':list.email,
                      'website':list.website,
                      'facebook':list.facebook,
                      'googleplus':list.googleplus,
                      'twitter':list.twitter,
                      'yearofestablishment':list.yearofestablishment,
                      'timeofoperationstart':list.timeofoperationstart,
                      'timeofoperationend':list.timeofoperationend,
                      'type':list.type,
                      'credits':list.credits,
                      'video':list.video,
                      'logo':list.logo,
                      'user':list.user}
            });
        },
        authenticate: function(){
            return $http.get(adminurl+"authenticate",{});
        },
        sendemail: function(userid,listingid){
            return $http.get(adminurl+"sendemail?userid="+userid+"&listingid="+listingid,{});
        },
        getlistingbycategory: function(id){
            return $http.get(adminurl+"getlistingbycategory?id="+id,{});
        },
        enquiryuser: function(name,listing,email,phone,comment){
            return $http.get(adminurl+"enquiryuser?name="+name+"&listing="+listing+"&email="+email+"&phone="+phone+"&type=2&comment="+comment,{});
        },
        getspecialoffersbycategory: function(cid){
            return $http.get(adminurl+"getspecialoffersbycategory?categoryid="+cid,{});
        },
        getonelistingbyid: function(id){
            return $http.get(adminurl+"getonelistingbyid?id="+id,{});
        },
        searchcategory: function(text,city){
            if(!city)
            {
                city='';
            }
            return $http.get(adminurl+"searchcategory?categoryname="+text+"&cityname="+city,{});
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