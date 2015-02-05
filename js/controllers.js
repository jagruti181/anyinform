var lat = 0;
var long = 0;
var city = '';
var area = '';
var pat = '\home';
var cityis = {};
var phonecatControllers = angular.module('phonecatControllers', ['templateservicemod', 'restservice', 'ngRoute', 'angularFileUpload', 'ngTagsInput', 'ngDialog', 'google-maps', 'toaster']);

window.uploadUrl = 'upload.php';

phonecatControllers.controller('home',
    function ($scope, TemplateService, RestService, $location, $sce, toaster) {
        $scope.template = TemplateService;
        TemplateService.header = "views/header.html";
        TemplateService.navigation = "views/navigation.html";
        TemplateService.slider = "views/slider.html";
        TemplateService.content = "views/content.html";
        TemplateService.footer = "views/footer.html";
        TemplateService.footerbottom = "views/footerbottom.html";
        $scope.demo = "demo testing";
        $scope.searchshow = false;
        $scope.searchid = "";
        $scope.form = [];
        $scope.city = '';

        var callback = function () {
            $scope.juser = RestService.getjuser();
                if ($scope.juser == null) {
                    $scope.signuppro = "Sign Up";
                    $scope.loginlogout = "Login";
                } else {
                    $scope.signuppro = "My Profile";
                    $scope.loginlogout = "Logout";
                    $scope.myemail = "Welcome ,  " + $scope.juser.firstname + " " + $scope.juser.lastname;
                }
        }
    
        var authsuccess = function (data, status) {
            
            console.log("auth auth success");
            console.log(data);
            console.log("auth authe success end");
            
            if(data != "false")
            {
                RestService.setjusera(data,callback);
                
            }
            
        };
    
        RestService.authenticate().success(authsuccess);
    
        $scope.pop = function () {
//            console.log("on pop");
            toaster.pop('success', "title", "<button>ok</button>", null, 'trustedHtml');

        };

        //        authentication user

        $scope.juser = RestService.getjuser();
        if ($scope.juser != null) {

            $scope.myemail = $scope.juser.email;


        }

        $scope.homecategory = {};

        // set banner
        var bannersuccess = function (data, status) {
            $scope.banner = data.banner;
//            console.log(RestService.setbanner(data.banner));
            $location.url('/subcategory/' + data.id);
        };
        $scope.oncategoryclick = function (banner) {
            RestService.getcategoryinfo(banner).success(bannersuccess);
        }

        //    Start Get all Banners / Adds
        var addsuccess = function (data, status) {
//            console.log("my adds");
//            console.log(data);
            for (var i = 0; i < data.length; i++) {
                if (data[i].position == 1) {
                    $scope.positionone = data[i].adds;
                } else {
                    $scope.positiontwo = data[i].adds;
                }
            }
//            console.log("one");
//            console.log($scope.positionone);
//            console.log("two");
//            console.log($scope.positiontwo);
        };

        RestService.alladd().success(addsuccess);

        //    End Get all Banners / Adds

        //  get area from city
        $scope.area = "";

        function showPosition2(position) {
            var latlon = position.coords.latitude + "," + position.coords.longitude;
//            console.log("Positions:.........");
//            console.log(position.coords);
            //$scope.coords = position.coords;
            lat = position.coords.latitude;
            long = position.coords.longitude;

            $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyDqN3t8_Nb04MF7jTufq-bkEHogZxyeUHY", {}, function (data) {
//                console.log(data);
                data = data.results[0].address_components;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].types[0] == "locality") {
                        cityis.selected = data[i].long_name;
//                        console.log(cityis.selected);
                    }
                    if (data[i].types[0] == "sublocality_level_1") {
                        //                        cityis.selected = data[i].long_name;
                        area = data[i].long_name;
                        $scope.area1 = data[i].long_name;
                        $scope.area = data[i].long_name;
                    }
                }
                var citywegot = 9;
                var cities = $scope.cities;
                for (var i = 0; i < $scope.cities.length; i++) {

//                    console.log($scope.cities[i].name == cityis.selected);
                    if ($scope.cities[i].name == cityis.selected) {
                        $scope.city = $scope.cities[i].name;
                        citywegot = $scope.cities[i].id;
                    }
                }
                $scope.form.cityy = citywegot;
                city = citywegot;
                $scope.$apply();
                console.log(citywegot);
                $scope.citychange(citywegot);
                $scope.$apply();

            });

        }

        var maincategories = function (data, status) {
            console.log(data[0].logo);
            console.log("formated data");
            $scope.homecategory = data;
            for (var i = 0; i < data.length; i++) {
                $scope.homecategory[i].logo = $sce.trustAsHtml(data[i].logo);
            }

            $scope.homecategory = partitionarray($scope.homecategory, 6);
            console.log(partitionarray($scope.homecategory, 6));
        };

        RestService.getallparentcategories().success(maincategories);

        var getlocation = function (data, status) {
            console.log(data);
            $scope.areas = data;
            //            $scope.form.area = data[0].id;
            $scope.form.area = 0;
        };

        $scope.citychange = function (city) {
            console.log(city);
            RestService.viewonecitylocations(city).success(getlocation);
        };
        $scope.totextbox = function (name, id) {
            $("input[name=abc]").val(name);
            $scope.searchid = id;
            $scope.searchshow = false;
        }

        $scope.innershearch = function () {
            RestService.recentvisit($scope.searchid);
            $location.url("/detail/" + $scope.searchid);
        };

        var searchsuccess = function (data, status) {
            console.log(data);
            if (data != "") {
                $scope.searchdrop = data;
                $scope.searchshow = true;
            } else {
                $scope.searchshow = false;

            }
            for (var i = 0; i < data.length; i++) {
                
                if(data[i].dist!=null && data[i].dist!='')
                {
                    $scope.searchdrop[i].search = data[i].categoryname + " " + data[i].name + " ( " + data[i].area + " ) " + data[i].dist + " KM ";
                }else{
                    $scope.searchdrop[i].search = data[i].categoryname + " " + data[i].name + " ( " + data[i].area + " ) ";
                }
                
            }
        };
        $scope.searchlist = function (text, city) {
            //            if (!city)
            //                city = 0;

            city = city;
            // substr()
            text = text.split(' in ');
            $scope.searchtext = text[0];
            if (!text[1]) {
                $scope.area = $scope.area;
                $scope.areatosend = '';
            } else {
                $scope.area = text[1];
                $scope.areatosend = text[1];
            }

            if (text[0] != "") {

                RestService.searchcategory($scope.searchtext, city, $scope.areatosend, lat, long).success(searchsuccess);
            } else {
                $scope.searchshow = false;
            }
        }
        var getcity = function (data, status) {
            $scope.cities = data;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition2, showError);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        };
        RestService.getallcity().success(getcity);
        // searching 

        //        var searchdata = function (data, status) {
//                    console.log("in home");
//                    console.log(data);
        //        };
        //        RestService.searchcategory("h").success(searchdata);



        // location lat long

        $scope.coords = {};

        //Google Maps API Lat Long




        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition2, showError);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }


        //function for home category


        function partitionarray(myarray, number) {
            var arrlength = myarray.length;
            var newarray = [];
            var j = -1;
            for (var i = 0; i < arrlength; i++) {
                if (i % number == 0) {
                    j++;
                    newarray[j] = [];
                }
                newarray[j].push(myarray[i]);
            }
            return newarray;
        };



    });

phonecatControllers.controller('category',
    function ($scope, TemplateService, RestService, $location, $routeParams, ngDialog, toaster) {
        $scope.template = TemplateService;
        TemplateService.content = "views/category.html";
        TemplateService.slider = false;
        TemplateService.navigation = "views/innerheader.html";
        $scope.demo = "hey hey hye";
        $scope.msg = "";
        $scope.msgarea = false;
        //        $scope.listingid = '';
        $scope.enquirymsg = '';

        $scope.onemailclick = function (listing) {
            $scope.listingid = listing;
            console.log("Demo is wokring");
            ngDialog.open({
                template: 'views/emailclick.html',
                controller: 'category'
            });
        };
        //    enquiry for listing

        $scope.enquiry = [];
        var enquirysuccess = function (data, status) {
            console.log(data);
            $scope.allvalidation = [];
            if (data == "1") {
                //                $scope.enquiryshow = true;
//                $scope.enquirymsg = "Enquiry Send successfuly";
                toaster.pop('success', "Enquiry", "Enquiry Send successfuly", 5000);

            } else {
                //                $scope.enquiryshow = true;
//                $scope.enquirymsg = "Sorry, Try again later";
                toaster.pop('error', "Enquiry", "Sorry, Try again later", 5000);
            }
        };
        $scope.enquiryuser = function (enquiry) {
            console.log(enquiry);

            $scope.allvalidation = [{
                field: $scope.enquiry.name,
                name: "Name",
                validation: ""
             }, {
                field: $scope.enquiry.email,
                name: "Email",
                validation: ""
             }, {
                field: $scope.enquiry.phone,
                name: "Phone Number",
                validation: ""
             }, {
                field: $scope.enquiry.comment,
                name: "Comment",
                validation: ""
             }];

            var check = formvalidation($scope.allvalidation);

            if ( check == '' ) {
                RestService.enquiryuser(enquiry.name, $scope.listingid, enquiry.email, enquiry.phone, enquiry.comment).success(enquirysuccess);
            } else {
                console.log("not ckeck");
                toaster.pop('error', "Enquiry", "Enter Proper "+check, 5000);
            }


        }

        var categoryinfosuccess = function (data, status) {
            console.log(data);
            $scope.banner = data;
            RestService.setbanner(data.banner);
        };
        RestService.getcategoryinfo($routeParams.id).success(categoryinfosuccess);

        //    start authen
        $scope.linkclick = function (id) {
            RestService.recentvisit(id);
            $location.url('/detail/' + id);
        }

        //special offers by category id

        var getoffers = function (data, status) {

            console.log("offers");
            console.log(data);
            $scope.offers = data;

        };
        RestService.getspecialoffersbycategory($routeParams.id).success(getoffers);


        //listiung by category id

        var getlisting = function (data, status) {
            console.log(data);
            if (data == "") {
                $scope.msg = "No Listing";
                $scope.msgarea = true;
            } else {
                $scope.msgarea = false;
                $scope.listings = data;
            }

        };
        RestService.getlistingbycategory($routeParams.id).success(getlisting);


        //filter
        var getfilter = function (data, status) {
            console.log(data);
            $scope.filters = data;
        };
        RestService.getfilter($routeParams.id).success(getfilter);

        //filter to category listing
        $scope.one1 = "";
        $scope.filterselect = function (iid, name) {
            $scope.one1 = name;
            $scope.one1 = "filterselected";
            $scope.listings = "";
            $location.url("/subcategory/" + iid);
            //            RestService.getlistingbycategory(iid).success(getlisting);
        }

        //        start authenticating user


        $scope.juser = RestService.getjuser();
        if ($scope.juser == null) {
            $scope.user = 0;

        } else {
            $scope.user = $scope.juser.id;
        }

        //        var getuser = function (data, status) {
//                    console.log("my data");
//                    console.log(data);
        //            if (data == "false") {
        //                $scope.user = 0;
        //            } else {
        //                $scope.user = data;
        //            }
        //        };
        //        RestService.authenticate().success(getuser);

        //        end authenticating user

        //        start send email to user

        var sendsuccess = function (data, status) {
            console.log(data);
        };
        $scope.sendemail = function (listing) {
            console.log("listing");
            console.log(listing);
            console.log("user");
            console.log($scope.user);
            pat = $location.url();
            if ($scope.user == 0) {
                $location.url('/login');
            } else {
                RestService.sendemail($scope.user, listing).success(sendsuccess);
            }

        }

        //        end send email to user

    });

phonecatControllers.controller('subcategory',
    function ($scope, TemplateService, RestService, $location, $routeParams) {
        $scope.template = TemplateService;
        TemplateService.content = "views/subcategory.html";
        TemplateService.slider = false;
        TemplateService.navigation = "views/innerheader.html";

        var categoryinfosuccess = function (data, status) {
            console.log("my banner");
            console.log(data);
            $scope.banner1 = data;
            RestService.setbanner(data.banner);
        };
        RestService.getcategoryinfo($routeParams.id).success(categoryinfosuccess);

        var allcat = function (data, status) {
            console.log(data);
            if (data == "") {
                $location.url("/category/" + $routeParams.id);
            } else {
                $scope.subcat = partitionarray(data, 2);
            }
            console.log(partitionarray(data, 3));

        };
        RestService.getsubcategory($routeParams.id).success(allcat);

        $scope.waytoin = function (id) {
            console.log(id);
            $location.url("/subcategory/" + id);

        }


        function partitionarray(myarray, number) {
            var arrlength = myarray.length;
            var newarray = [];
            var j = -1;
            for (var i = 0; i < arrlength; i++) {
                if (i % number == 0) {
                    j++;
                    newarray[j] = [];
                }
                newarray[j].push(myarray[i]);
            }
            return newarray;
        };




    });

phonecatControllers.controller('detail',
    function ($scope, TemplateService, RestService, $location, $routeParams, ngDialog, toaster) {
        $scope.template = TemplateService;
        TemplateService.content = "views/detail.html";
        TemplateService.slider = false;
        TemplateService.navigation = "views/innerheader.html";
        $scope.enquirymsg = "";
        $scope.enquiryshow = false;
        $scope.enquiry = [];
        $scope.recentvisit = [];

        angular.extend($scope, {
            centerProperty: {
                lat: 45,
                lng: -73
            },
            zoomProperty: 8,
            markersProperty: [{
                latitude: 45,
                longitude: -74
    }],
            clickedLatitudeProperty: null,
            clickedLongitudeProperty: null,
        });

        $scope.imagelightbox = function (img) {
            ngDialog.open({
                template: '<img src="http://mafiawarloots.com/foranyinformation/uploads/' + img + '" style="width:100%;height:auto;">',
                plain: true
            });
        };


        var sum = _.reduce([1, 2, 3], function (memo, num) {
            return memo + num;
        }, 0);
        console.log("underscore");
        console.log(sum);




        $scope.listid = RestService.getrecentvisit();
        console.log("my recent visits");
        console.log($scope.listid);
        var getlistingrecent = function (data, status) {
            console.log(data);
            $scope.recentvisit = data;
        };
        RestService.getlistingarray($scope.listid).success(getlistingrecent);

        // Get recent visit
        console.log("my recent visit");
        console.log(RestService.getrecentvisit());


        //get detail listing
        var getdetail = function (data, status) {
            console.log(data);
            $scope.detail = data;
            angular.extend($scope, {
                centerProperty: {
                    lat: data.listing.lat,
                    lng: data.listing.long
                },
                zoomProperty: 10,
                markersProperty: [{
                    latitude: data.listing.lat,
                    longitude: data.listing.long
    }]
            });
        };
        RestService.getonelistingbyid($routeParams.id).success(getdetail);

        //    enquiry for listing


        var enquirysuccess = function (data, status) {
            $scope.allvalidation = [];
            console.log(data);
            if (data == "1") {
                //                $scope.enquiryshow = true;
//                $scope.enquirymsg = "Enquiry Send successfuly";
                toaster.pop('success', "Enquiry", "Enquiry Send successfuly", 5000);

            } else {
                //                $scope.enquiryshow = true;
//                $scope.enquirymsg = "Sorry, Try again later";
                toaster.pop('error', "Enquiry", "Sorry, Try again later", 5000);
            }
        };
        $scope.enquiryuser = function (enquiry) {
            console.log(enquiry);

            $scope.allvalidation = [{
                field: $scope.enquiry.name,
                name: "Name",
                validation: ""
             }, {
                field: $scope.enquiry.email,
                name: "Email",
                validation: ""
             }, {
                field: $scope.enquiry.phone,
                name: "Phone",
                validation: ""
             }, {
                field: $scope.enquiry.comment,
                name: "Comment",
                validation: ""
             }];

            var check = formvalidation($scope.allvalidation);

            if ( check == '' ) {
                RestService.enquiryuser(enquiry.name, $scope.detail.listing.listingid, enquiry.email, enquiry.phone, enquiry.comment).success(enquirysuccess);
            } else {
                toaster.pop('error', "Enquiry", "Enter Proper "+check, 5000);
            }


        }

    });

phonecatControllers.controller('about',
    function ($scope, TemplateService) {
        $scope.template = TemplateService;
        $scope.menutitle = NavigationService.makeactive("About");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    });
phonecatControllers.controller('profile',
    function ($scope, TemplateService, RestService) {
        $scope.template = TemplateService;
        TemplateService.content = "views/profile.html";
        TemplateService.slider = false;
        TemplateService.navigation = "views/innerheader.html";

        // controller vriables
        $scope.profile = [];

        // user authentication

        var usersuccess = function (data, status) {
            console.log(data);
            $scope.profile = data;
        };


        $scope.juser = RestService.getjuser();
        if ($scope.juser != null) {

            $scope.user = $scope.juser.id;
            RestService.getuser($scope.juser.id).success(usersuccess);

        }

        //        var getuser = function (data, status) {
//                    console.log("my data");
//                    console.log(data);
        //            $scope.user = data;
        //            RestService.getuser(data).success(usersuccess);
        //        }
        //        RestService.authenticate().success(getuser);

        // get user profile stored data

        $scope.signupmsg = "";

        var profilesuccess = function (data, status) {

            console.log(data);
            if (data == "1") {
                $scope.profilemsg = "Profile Updated";
            }

        };

        $scope.saveprofile = function (profile) {
            console.log("user in save profile");
            console.log(profile);
//                        console.log($scope.profile);
//                        console.log(profile);
            //profile validation
            $scope.allvalidation1 = [{
                field: $scope.profile.firstname,
                validation: ""
             }, {
                field: $scope.profile.lastname,
                validation: ""
             }, {
                field: $scope.profile.email,
                validation: ""
             }];

            var check = formvalidation($scope.allvalidation1);

            if (check=='') {
                console.log("yahooo...checked");
                RestService.saveprofile(profile).success(profilesuccess);

            } else {
                console.log("not ckeck");
            }

        }
    });

phonecatControllers.controller('login',
    function ($scope, TemplateService, RestService, $location, $routeParams, toaster) {
        $scope.template = TemplateService;
        TemplateService.content = "views/login.html";
        TemplateService.slider = false;
        TemplateService.navigation = "views/innerheader.html";
        $scope.msg = "";
        $scope.msg1 = "";
        $scope.login = [];

        var loginsuccess = function (data, status) {
            console.log("after login");
            console.log(data);
            if (data != "false") {
                $location.url("/home");
                $scope.loginlogout = "Logout";
                RestService.setjuser(data);
            } else {
                toaster.pop("error", "Login Error", "Invalid Username Or Password", 5000);
            }

        };

        $scope.userlogin = function (login) {

            //login validation
            $scope.allvalidation1 = [{
                field: $scope.login.email,
                name: "Email",
                validation: ""
             }, {
                field: $scope.login.password,
                name: "Password",
                validation: ""
             }];

            var check = formvalidation($scope.allvalidation1);

            if ( check == '' ) {

                RestService.login(login.email, login.password).success(loginsuccess);

            } else {
                console.log("not ckeck");
                toaster.pop('error', "Login", "Enter Proper "+check, 5000);
            }
        }
        //    
        //        var getuser = function (data, status){
//                    console.log(data);
        //        };
        //        RestService.authenticate().success(getuser);
        $scope.signupmsg = "";
        $scope.signupmsgg = false;
        $scope.clickme = function () {
            console.log("helloooooo");
        }
    });


phonecatControllers.controller('signup',
    function ($scope, TemplateService, RestService, $location, $routeParams, toaster) {
        $scope.template = TemplateService;
        TemplateService.content = "views/signup.html";
        TemplateService.slider = false;
        TemplateService.navigation = "views/innerheader.html";
        $scope.signup = [];

        $scope.signupmsg = "";
        $scope.signupmsgg = false;
    
//        login with facebook
        var onfacebooklogin = function (data, status) {
            console.log(data);
        };
        $scope.tofacebook = function () {
            console.log("facebook click");
            RestService.facebooklogin().success(onfacebooklogin);
        }
    
        $scope.clickme = function () {
            console.log("helloooooo");
        }
        var getuser = function (data, status) {
            console.log(data);
            if (data == "false") {
                $scope.signupmsgg = true;
                $scope.signupmsg = "Already Exist. Choose Another Email Address";
                toaster.pop("error", "Signup Error", "Already Exist. Choose Another Email Address", 50000);
            } else {
                $location.url("/login");
            }
        };
        $scope.signupuser = function (signup) {

            //signup validation
            $scope.allvalidation = [{
                field: $scope.signup.firstname,
                name: "First Name",
                validation: ""
             }, {
                field: $scope.signup.lastname,
                name: "Last Name",
                validation: ""
             }, {
                field: $scope.signup.phoneno,
                name: "Phone Number",
                validation: ""
             }, {
                field: $scope.signup.email,
                name: "Email",
                validation: ""
             }, {
                field: $scope.signup.password,
                name: "Password",
                validation: ""
             }, {
                field: $scope.signup.cpassword,
                name: "Confirm Password",
                validation: ""
             }];

            var check = formvalidation($scope.allvalidation);

            if ( check == '' ) {
                if ($scope.signup.password === $scope.signup.cpassword) {
                    $scope.signupmsg = "";
                    console.log("phone no");
                    console.log(signup.phoneno);
                    RestService.signup(signup.firstname, signup.lastname, signup.phoneno, signup.email, signup.password).success(getuser);
                } else {
                    $scope.signupmsg = "Wroung password";
                    toaster.pop("error", "Signup Error", "Wroung password", 5000);
                }

            } else {
                console.log("not ckeck");
                toaster.pop("error", "Signup Error", "Enter Proper " + check, 5000);
            }


        }

    });



phonecatControllers.controller('OtherCtrl',
    function ($scope, TemplateService, RestService, $location, $routeParams) {
        $scope.template = TemplateService;
        $scope.userdata = [];
        $scope.demo = "demo";
        $scope.myemail = "";

        $scope.gotoprofile = function () {
            $location.url('/profile');
        }
    
    
        $scope.banner = RestService.getbanner();
        console.log("my banner//////////////////////////////");
        console.log(RestService.getbanner());

        //        toster function
        //        $scope.pop = function(){
//                    console.log("on pop");
        //            toaster.pop('success', "title", "text");
        //        };

        var getuser = function (data, status) {
            $scope.userdata = data;
            console.log("my data");
            console.log(data.email);

            console.log($scope.myemail);
            if (data == "false") {
                $scope.signuppro = "Sign Up";
                $scope.loginlogout = "Login";
            } else {
                $scope.signuppro = "My Profile";
                $scope.loginlogout = "Logout";
                $scope.myemail = "Welcome ,  " + data.firstname;
            }
        };
        //        RestService.authenticate().success(getuser);
        var linloutsuccess = function (data, status) {
            console.log(data);
            $location.url('/home');
        };


        //        jstorage get
        $scope.juser = RestService.getjuser();
        if ($scope.juser == null) {
            $scope.signuppro = "Sign Up";
            $scope.loginlogout = "Login";
        } else {
            $scope.signuppro = "My Profile";
            $scope.loginlogout = "Logout";
            $scope.myemail = "Welcome ,  " + $scope.juser.firstname + " " + $scope.juser.lastname;
        }


        $scope.signupprofile = function () {
            if ($scope.signuppro == "Sign Up") {
                $location.url('/signup');
            } else {
                $location.url('/profile');
            }
        }
        //show listing one home page button
        $scope.showlisting = function () {

            if ($scope.userdata == "false") {
                $location.url('/login');
            } else {
                $location.url('/listbusiness');
            }

        }

        // home page login function
        $scope.loginfunction = function () {
            if ($scope.loginlogout == "Logout") {
                $scope.loginlogout = "Login";
                $scope.myemail = "";
                RestService.logout().success(linloutsuccess);
            } else {
                $location.url('/login');
            }
        }

        // on inner search go button

        $scope.innershearch = function () {
            RestService.recentvisit($scope.searchid);
            $location.url("/detail/" + $scope.searchid);
        };

        // innersearch in drop click

        $scope.totextbox = function (name, id) {
            $("input[name=abc]").val(name);
            $scope.searchid = id;
            $scope.searchshow = false;
        }

        // inner header search 

        var searchsuccess = function (data, status) {
            console.log(data);
            if (data != "") {
                $scope.searchdrop = data;
                $scope.searchshow = true;
            } else {
                $scope.searchshow = false;

            }
            for (var i = 0; i < data.length; i++) {
                if(data[i].dist!=null && data[i].dist!='')
                {
                    $scope.searchdrop[i].search = data[i].categoryname + " " + data[i].name + " ( " + data[i].area + " ) " + data[i].dist + " KM ";
                }else{
                    $scope.searchdrop[i].search = data[i].categoryname + " " + data[i].name + " ( " + data[i].area + " ) ";
                }
            }
        };

        $scope.searchlist = function (text) {
            //            if (!city)
            //                city = 0;
            console.log("my city");
            console.log(city);
            console.log("my area");
            console.log(area);

            // substr()
            text = text.split(' in ');
            console.log("search tet");
            $scope.searchtext = text[0];
            console.log("city");
            console.log(text[1]);
            if (!text[1]) {
                                $scope.area = '';
//                $scope.area = $scope.area;
            } else {
                $scope.area = text[1];
            }

            if (text[0] != "") {

                RestService.searchcategory($scope.searchtext, city, $scope.area, lat, long).success(searchsuccess);
            } else {
                $scope.searchshow = false;
            }
        }

    });

phonecatControllers.controller('listbusiness',
    function ($scope, TemplateService, RestService, $location) {
        $scope.template = TemplateService;
        TemplateService.content = "views/listbusiness.html";
        TemplateService.slider = false;
        TemplateService.navigation = false;
        TemplateService.navigation = "views/innerheader.html";
        $scope.userdata = "";
        $scope.list = [];
        $scope.list.category = [];
        $scope.catgo = [];
        $scope.demo = "";
        $scope.ipath = "views/f2.php?id=event";
        $scope.ipath1 = "views/f1.php?id=event";
        //    start my angular tree view
        var gettreeview = function (data, status) {
            console.log(data);
            $scope.roleList = data.children;
        };
        RestService.getcategorytree().success(gettreeview);
        console.log("tree select");
        $scope.tagcategory = [];
        $scope.selectNodeLabel = function (c, b) {
//                    console.log(c);
            //        if($scope.catgo=="")
            //        {
            //            $scope.catgo=c.id;
            //        }else{
            if ($scope.tagcategory.length == 0) {
                $scope.list.category.push(c.id);
                console.log($scope.list.category);
                $scope.tagcategory.push({
                    text: c.name,
                    id: c.id
                });
                console.log($scope.tagcategory.length);
            } else {
                for (var i = 0; i < $scope.tagcategory.length; i++) {
                    console.log($scope.tagcategory[0].id);
                    if ($scope.tagcategory[i].id == c.id) {
                        $scope.check = 0;
                    } else {
                        $scope.check = 1;
                    }
                }
                if ($scope.check == 1) {
                    $scope.list.category.push(c.id);
                    console.log($scope.list.category);
                    $scope.tagcategory.push({
                        text: c.name,
                        id: c.id
                    });
                    console.log($scope.tagcategory.length);
                }
            }

        }
        $scope.addcategory = function (data) {
            console.log(data);

        }

        //    end my angular tree view

        //        start validation for user if not valid go to home page


        $scope.juser = RestService.getjuser();
        if ($scope.juser != null) {

            $scope.userdata = $scope.juser.id;


        } else {

            $location.url("/login");

        }

        //        var getuser = function (data, status) {
//                    console.log(data);
        //            if (data == "false") {
        //                $location.url("/login");
        //            } else {
        //                $scope.userdata = data;
        //            }
        //        };
        //        RestService.authenticate().success(getuser);

        //        end validation for user if not valid go to home page

        //        start add category tag
        $scope.addcategorytab = function (cat) {
            console.log(cat);
        }

        //        end add category tag

        //        start get latitude and longitude by address parameters

        var mapp = function (data, state) {
            console.log(data);
            console.log(data.results[0].geometry.location.lat);
            console.log(data.results[0].geometry.location.lng);
            $scope.list.latitude = data.results[0].geometry.location.lat;
            $scope.list.longitude = data.results[0].geometry.location.lng;

        };
        $scope.getlatlong = function (address, area, pin, city, state, country) {
            if (!address) {
                address = "";
            }
            if (!area) {
                area = "";
            }
            if (!pin) {
                pin = "";
            }
            if (!city) {
                city = "";
            } else {
                $scope.city = city.split(",");
                city = $scope.city['1'];
            }
            if (!state) {
                state = "";
            }
            if (!country) {
                country = "";
            }

            $scope.lmap = address + "," + area + "," + pin + "," + city + "," + state + "," + country;
            console.log($scope.lmap);
            RestService.getmap($scope.lmap).success(mapp);
        };

        //        end get latitude and longitude by address parameters

        //        start on listbusiness submit

        var listingsuccess = function (data, status) {

            console.log(data);
            if (data == 1) {
                alert("Listing Saved");
            } else {
                alert("ERROR IN SAVING");
            }

        };


        $scope.submitlist = function (list) {
            $scope.logo = $(".myiframe").contents().find("body img").attr("src");
            $scope.logo = $scope.logo.split('/');
            list.logo = $scope.logo['4'];
            //            $scope.video = $(".myiframe1").contents().find("body img").attr("src");
            //                $scope.video = $scope.video.split('/');
            //                list.video = $scope.video['4'];

            $scope.allvalidation = [{
                field: $scope.list.name,
                validation: ""
             }, {
                field: $scope.tagcategory,
                validation: ""
             }, {
                field: $scope.list.modeofpayment,
                validation: ""
             }, {
                field: $scope.list.daysofoperation,
                validation: ""
             }, {
                field: $scope.list.address,
                validation: ""
             }, {
                field: $scope.list.area,
                validation: ""
             }, {
                field: $scope.list.pincode,
                validation: ""
             }, {
                field: $scope.list.city,
                validation: ""
             }, {
                field: $scope.list.state,
                validation: ""
             }, {
                field: $scope.list.country,
                validation: ""
             }, {
                field: $scope.list.contact,
                validation: ""
             }, {
                field: $scope.list.email,
                validation: ""
             }, {
                field: $scope.list.type,
                validation: ""
             }];

            var check = formvalidation($scope.allvalidation);

            if (check) {
                list.user = $scope.userdata;
                //                list.logo = "default.jpg";
                list.city = list.city.split(",");
                list.city = list.city['0'];
                console.log(list);
                RestService.createlisting(list).success(listingsuccess);
            } else {
                console.log("not ckeck");
            }

        }

        //        end on listbusiness submit

        //        start get category all category
        $scope.tagdata = [];
        var allcategories = function (data, status) {
            console.log(data);
            $scope.alljson = data;
        };

        RestService.getallcategory().success(allcategories);

        //        end get category all category

    });
phonecatControllers.controller('portfolio', ['$scope', 'TemplateService',
  function ($scope, TemplateService) {
        $scope.template = TemplateService;
        $scope.menutitle = NavigationService.makeactive("Portfolio");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
  }]);
phonecatControllers.controller('contact', ['$scope', 'TemplateService',
  function ($scope, TemplateService) {
        $scope.template = TemplateService;
        $scope.menutitle = NavigationService.makeactive("Contact");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
  }]);


phonecatControllers.controller('headerctrl', ['$scope', 'TemplateService',
 function ($scope, TemplateService) {
        $scope.template = TemplateService;
        $scope.demo = "demo";
  }]);


phonecatControllers.controller('MyCtrl',
    function ($scope, $http, $timeout, $upload) {

        $scope.usingFlash = FileAPI && FileAPI.upload != null;
        $scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
        $scope.uploadRightAway = true;
        $scope.changeAngularVersion = function () {
            window.location.hash = $scope.angularVersion;
            window.location.reload(true);
        };
        $scope.hasUploader = function (index) {
            return $scope.upload[index] != null;
        };
        $scope.abort = function (index) {
            $scope.upload[index].abort();
            $scope.upload[index] = null;
        };
        $scope.angularVersion = window.location.hash.length > 1 ? (window.location.hash.indexOf('/') === 1 ?
            window.location.hash.substring(2) : window.location.hash.substring(1)) : '1.2.20';
        $scope.onFileSelect = function ($files) {
            $scope.selectedFiles = [];
            $scope.progress = [];
            if ($scope.upload && $scope.upload.length > 0) {
                for (var i = 0; i < $scope.upload.length; i++) {
                    if ($scope.upload[i] != null) {
                        $scope.upload[i].abort();
                    }
                }
            }
            $scope.upload = [];
            $scope.uploadResult = [];
            $scope.selectedFiles = $files;
            $scope.dataUrls = [];
            for (var i = 0; i < $files.length; i++) {
                var $file = $files[i];
                if ($scope.fileReaderSupported && $file.type.indexOf('image') > -1) {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL($files[i]);
                    var loadFile = function (fileReader, index) {
                        fileReader.onload = function (e) {
                            $timeout(function () {
                                $scope.dataUrls[index] = e.target.result;
                            });
                        }
                    }(fileReader, i);
                }
                $scope.progress[i] = -1;
                if ($scope.uploadRightAway) {
                    $scope.start(i);
                }
            }
        };

        $scope.start = function (index) {
            $scope.progress[index] = 0;
            $scope.errorMsg = null;
            if ($scope.howToSend == 1) {
                $scope.upload[index] = $upload.upload({
                    url: uploadUrl,
                    method: $scope.httpMethod,
                    headers: {
                        'my-header': 'my-header-value'
                    },
                    data: {
                        myModel: $scope.myModel
                    },
                    /* formDataAppender: function(fd, key, val) {
					if (angular.isArray(val)) {
                        angular.forEach(val, function(v) {
                          fd.append(key, v);
                        });
                      } else {
                        fd.append(key, val);
                      }
				}, */
                    /* transformRequest: [function(val, h) {
					console.log(val, h('my-header')); return val + '-modified';
				}], */
                    file: $scope.selectedFiles[index],
                    fileFormDataName: 'file'
                });
                $scope.upload[index].then(function (response) {
                    $timeout(function () {
                        $scope.uploadResult.push(response.data);
                    });
                }, function (response) {
                    if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
                $scope.upload[index].xhr(function (xhr) {
//                    				xhr.upload.addEventListener('abort', function() {console.log('abort complete')}, false);
                });
            } else {
                var fileReader = new FileReader();
                fileReader.onload = function (e) {
                    $scope.upload[index] = $upload.http({
                        url: uploadUrl,
                        headers: {
                            'Content-Type': $scope.selectedFiles[index].type
                        },
                        data: e.target.result
                    }).then(function (response) {
                        $scope.uploadResult.push(response.data);
                    }, function (response) {
                        if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
                    }, function (evt) {
                        // Math.min is to fix IE which reports 200% sometimes
                        $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    });
                }
                fileReader.readAsArrayBuffer($scope.selectedFiles[index]);
            }
        };

        $scope.dragOverClass = function ($event) {
            var items = $event.dataTransfer.items;
            var hasFile = false;
            if (items != null) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].kind == 'file') {
                        hasFile = true;
                        break;
                    }
                }
            } else {
                hasFile = true;
            }
            return hasFile ? "dragover" : "dragover-err";
        };

    });



function AlertDemoCtrl($scope) {
    $scope.alerts = [
        {
            type: 'danger',
            msg: 'Oh snap! Change a few things up and try submitting again.'
        },
        {
            type: 'success',
            msg: 'Well done! You successfully read this important alert message.'
        }
    ];

    $scope.addAlert = function () {
        $scope.alerts.push({
            msg: 'Another alert!'
        });
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

}