var onlyadminurl="http://mafiawarloots.com/foranyinformation/";
//var onlyadminurl="http://localhost/foranyinformation/";
var adminurl=onlyadminurl+"index.php/json/";
//var adminurl="http://localhost/foranyinformation/index.php/json/";


var restservice = angular.module('restservice', [])

.factory('RestService', function ($http) {
   
    var banner='';
    var recent = [];
    return {
        getmap: function(data){
            return $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+data+"&key=AIzaSyAj0OXepKIgjTlZiPe_ZVYTDjL8rYpobgQ",{});
        },
        recentvisit: function(id){
//            console.log("my recent id");
//            console.log(id);
//            $recent = {
//                'one' : id
//            };
//            recent=$.jStorage.get('recent');
            recent.push(id);
            if(recent.length > 3)
            {
            recent.splice(0,1);
//                $scope.cat.splice(i, 1);
            }
        $.jStorage.set('recent',recent);
        },
        setjuser: function(data){
            $.jStorage.set('anyuser',data);
        },
        getjuser: function(data){
            return $.jStorage.get('anyuser');
        },
        getrecentvisit: function(){
            return $.jStorage.get('recent');
        },
        facebooklogin: function(){
            return $http.get(onlyadminurl+"index.php/hauth/login/Facebook",{});
        },
        getuser: function(id){
            return $http.get(adminurl+"getuser?id="+id,{});
        },
        getsubcategory: function(id){
            return $http.get(adminurl+"getsubcategory?id="+id,{});
        },
        logout: function(){
            $.jStorage.flush();
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
                      'area':list.area,
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
        saveprofile: function(profile){
            return $http({
                url: adminurl+"saveprofile",
                method: "POST",
               data: {'id':profile.id,
                      'firstname':profile.firstname,
                      'lastname':profile.lastname,
                      'email':profile.email,
                      'contact':profile.contact,
                      'dob':profile.dob,
                      'website':profile.website,
                      'address':profile.address,
                      'city':profile.city,
                      'pincode':profile.pincode,
                      'state':profile.state,
                      'country':profile.country,
                      'google':profile.google,
                      'facebookuserid':profile.facebookuserid}
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
            
            return $http.get(adminurl+"addenquiryoflistingfromfrontend?listingid="+listing+"&name="+name+"&email="+email+"&phone="+phone+"&comment="+comment,{});
        },
        getspecialoffersbycategory: function(cid){
            return $http.get(adminurl+"getspecialoffersbycategory?categoryid="+cid,{});
        },
        getonelistingbyid: function(id){
            return $http.get(adminurl+"getonelistingbyid?id="+id,{});
        },
        getlistingarray: function(id){
            return $http.get(adminurl+"getlistingarray?ids="+id,{});
        },
        searchcategory: function(text,city,area,lat,long){
            if(!city)
            {
                city='';
            }
            return $http.get(adminurl+"searchcategory?categoryname="+text+"&cityname="+city+"&area="+area+"&lat="+lat+"&long="+long,{});
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
        signup: function(firstname,lastname,phoneno,email,password){
            return $http.get(adminurl+"signup?firstname="+firstname+"&lastname="+lastname+"&phoneno="+phoneno+"&email="+email+"&password="+password,{});
        }

    }
});