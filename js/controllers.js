var lat = 0;
var long = 0;
var phonecatControllers = angular.module('phonecatControllers', ['templateservicemod', 'restservice', 'ngRoute', 'angularFileUpload', 'ngTagsInput']);

window.uploadUrl = 'upload.php';

phonecatControllers.controller('home',
    function ($scope, TemplateService, RestService, $location, $sce) {
        $scope.template = TemplateService;
        TemplateService.header = "views/header.html";
        TemplateService.navigation = "views/navigation.html";
        TemplateService.slider = "views/slider.html";
        TemplateService.content = "views/content.html";
        TemplateService.footer = "views/footer.html";
        TemplateService.footerbottom = "views/footerbottom.html";
        $scope.demo="demo";
        $scope.searchshow = false;
        $scope.searchid = "";
        $scope.form = [];
        //$scope.form.cityy = 9;
        $scope.homecategory = {};
        //  get area from city

        function showPosition2(position) {
            var latlon = position.coords.latitude + "," + position.coords.longitude;
            console.log("Positions:.........");
            console.log(position.coords);
            //$scope.coords = position.coords;
            lat = position.coords.latitude;
            long = position.coords.longitude;
            $scope.cityis = {};
            $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyDqN3t8_Nb04MF7jTufq-bkEHogZxyeUHY", {}, function (data) {
                console.log(data);
                data = data.results[0].address_components;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].types[0] == "locality") {
                        $scope.cityis.selected = data[i].long_name;
                        console.log($scope.cityis.selected);
                    }
                }
                var citywegot = 9;
                var cities = $scope.cities;
                for (var i = 0; i < $scope.cities.length; i++) {
                    
                    console.log($scope.cities[i].name == $scope.cityis.selected);
                    if ($scope.cities[i].name == $scope.cityis.selected) {
                    
                        citywegot = $scope.cities[i].id;
                    }
                }
                $scope.form.cityy = citywegot;
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
        };

        RestService.getallparentcategories().success(maincategories);

        var getlocation = function (data, status) {
            console.log(data);
            $scope.areas = data;
            $scope.form.area = data[0].id;
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
            $location.url("/subcategory/" + $scope.searchid);
        };

        var searchsuccess = function (data, status) {
            console.log(data);
            if (data != "") {
                $scope.searchdrop = data;
                $scope.searchshow = true;
            } else {
                $scope.searchshow = false;

            }
        };
        $scope.searchlist = function (text) {
            console.log(text);
            if (text != "") {
                RestService.searchcategory(text).success(searchsuccess);
            } else {
                $scope.searchshow = false;
            }
        }

        var getcity = function (data, status) {
            console.log(data);
            $scope.cities = data;
        };
        RestService.getallcity().success(getcity);
        // searching 

//        var searchdata = function (data, status) {
//            console.log("in home");
//            console.log(data);
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
    function ($scope, TemplateService, RestService, $location, $routeParams) {
        $scope.template = TemplateService;
        TemplateService.content = "views/category.html";
        TemplateService.slider = false;
        TemplateService.navigation = "views/innerheader.html";

        $scope.msg = "";
        $scope.msgarea = false;
    
        $scope.linkclick = function(id)
        {
            $location.url('/detail/'+id);
        }
    
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
            RestService.getlistingbycategory(iid).success(getlisting);
        }
    });

phonecatControllers.controller('subcategory',
    function ($scope, TemplateService, RestService, $location, $routeParams) {
        $scope.template = TemplateService;
        TemplateService.content = "views/subcategory.html";
        TemplateService.slider = false;
        TemplateService.navigation = "views/innerheader.html";

        var allcat = function (data, status) {
            console.log(data);
            if (data == "") {
                $location.url("/category/" + $routeParams.id);
            } else {
                $scope.subcat = data;
            }

        };
        RestService.getsubcategory($routeParams.id).success(allcat);

        $scope.waytoin = function (id) {
            console.log(id);
            $location.url("/subcategory/" + id);

        }

    });

phonecatControllers.controller('detail',
    function ($scope, TemplateService, RestService, $location, $routeParams) {
        $scope.template = TemplateService;
        TemplateService.content = "views/detail.html";
        TemplateService.slider = false;
        TemplateService.navigation = "views/innerheader.html";

        //get detail listing
        var getdetail = function (data, status) {
            console.log(data);
            $scope.detail = data;
        };
        RestService.getonelistingbyid($routeParams.id).success(getdetail);
    
//    enquiry for listing
    
    
        var enquirysuccess = function (data, status) {
            console.log(data);
        };
        $scope.enquiryuser = function (enquiry) {
            console.log(enquiry);
            
            RestService.enquiryuser(enquiry.name,$scope.detail.listing.listingid,enquiry.email,enquiry.phone,enquiry.comment).success(enquirysuccess);
        }

    });

phonecatControllers.controller('about',
    function ($scope, TemplateService) {
        $scope.template = TemplateService;
        $scope.menutitle = NavigationService.makeactive("About");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    });

phonecatControllers.controller('login',
    function ($scope, TemplateService, RestService, $location, $routeParams) {
        $scope.template = TemplateService;
        TemplateService.content = "views/login.html";
        TemplateService.slider = false;
        TemplateService.navigation = "views/innerheader.html";
        $scope.msg="";
        $scope.msg1="";
    
        var loginsuccess = function (data, status){
            console.log(data);
            if(data!="false")
            {
                $location.url("/home");
                $scope.loginlogout="Logout";
            }else{
                $scope.msg="Invalid Username Or Password";
            }
            
        };
    
        $scope.userlogin = function (login){
            console.log(login);
            RestService.login(login.email,login.password).success(loginsuccess);
        }
//    
//        var getuser = function (data, status){
//            console.log(data);
//        };
        RestService.authenticate().success(getuser);
        $scope.signupmsg = "";
        $scope.signupmsgg = false;
        $scope.clickme = function () {
            console.log("helloooooo");
        }
        var getuser = function (data, status) {
            console.log(data);
            if (data == false) {
                $scope.signupmsgg = true;

                $scope.signupmsg = "Already Exist. Choose Another Id";
            }
        };
        $scope.signupuser = function (signup) {
            console.log(signup);
            RestService.signup(signup.email, signup.password).success(getuser);
        }

        //signup
    });



phonecatControllers.controller('OtherCtrl',
 function ($scope, TemplateService, RestService, $location, $routeParams) {
        $scope.template = TemplateService;
        
        var getuser = function (data, status){
            console.log(data);
            if(data=="false")
            {
                $scope.signuppro="Sign Up";
                $scope.loginlogout="Login";
            }else{
                $scope.signuppro="My Profile";
                $scope.loginlogout="Logout";
            }
        };
        RestService.authenticate().success(getuser);
    var linloutsuccess = function (data, status) {
        console.log(data);
        $location.url('/home');
    };
    
    $scope.signupprofile = function () {
        if($scope.signuppro=="Sign Up")
        {
            $location.url('/login');
        }
    }
    
    $scope.loginfunction = function(){
        if($scope.loginlogout=="Logout")
        {
            $scope.loginlogout="Login";
            RestService.logout().success(linloutsuccess);
        }else{
            $location.url('/login');
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
        $scope.userdata="";
        $scope.list=[];
    
//        start validation for user if not valid go to home page
    
//        var getuser = function (data, status){
//            console.log(data);
//            if(data=="false")
//            {
//                $location.url("/home");
//            }else{
//                $scope.userdata=data;
//            }
//        };
//        RestService.authenticate().success(getuser);
    
//        end validation for user if not valid go to home page
        
//        start add category tag
            $scope.addcategorytab = function (cat){
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
        $scope.getlatlong = function (address, pin, city, state, country) {
            if(!address)
            {
                address="";
            }
            if(!pin)
            {
                pin="";
            }
            if(!city)
            {
                city="";
            }else{
                $scope.city=city.split(",");
                city=$scope.city['1'];
            }
            if(!state)
            {
                state="";
            }
            if(!country)
            {
                country="";
            }
            
            $scope.lmap = address + "," + pin + "," + city + "," + state + "," + country;
            console.log($scope.lmap);
            RestService.getmap($scope.lmap).success(mapp);
        };
    
//        end get latitude and longitude by address parameters
    
//        start on listbusiness submit
    
        var listingsuccess = function (data, status) {
            
            console.log(data);
            
        };
    
    
         $scope.submitlist = function (list) {
             
             
            $scope.allvalidation = [{
                field: $scope.list.name,
                validation: ""
             }, {
                field: $scope.list.category,
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
             
             if(check)
             {
                list.user=$scope.userdata;
                list.logo="default.jpg";
                list.city=list.city.split(",");
                list.city=list.city['0'];
                console.log(list);
                RestService.createlisting(list).success(listingsuccess);
             }else{
                 console.log("not ckeck");
             }
             
         }
    
//        end on listbusiness submit
    
//        start get category all category
        $scope.tagdata=[];
        var allcategories = function (data, status) {
            console.log(data);
            $scope.alljson=data;
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
        $scope.demo="demo";
  }]);


phonecatControllers.controller('MyCtrl',
 function ($scope, $http, $timeout, $upload) {
    
	$scope.usingFlash = FileAPI && FileAPI.upload != null;
	$scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
	$scope.uploadRightAway = true;
	$scope.changeAngularVersion = function() {
		window.location.hash = $scope.angularVersion;
		window.location.reload(true);
	};
	$scope.hasUploader = function(index) {
		return $scope.upload[index] != null;
	};
	$scope.abort = function(index) {
		$scope.upload[index].abort(); 
		$scope.upload[index] = null;
	};
	$scope.angularVersion = window.location.hash.length > 1 ? (window.location.hash.indexOf('/') === 1 ? 
			window.location.hash.substring(2): window.location.hash.substring(1)) : '1.2.20';
	$scope.onFileSelect = function($files) {
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
		for ( var i = 0; i < $files.length; i++) {
			var $file = $files[i];
			if ($scope.fileReaderSupported && $file.type.indexOf('image') > -1) {
				var fileReader = new FileReader();
				fileReader.readAsDataURL($files[i]);
				var loadFile = function(fileReader, index) {
					fileReader.onload = function(e) {
						$timeout(function() {
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
	
	$scope.start = function(index) {
		$scope.progress[index] = 0;
		$scope.errorMsg = null;
		if ($scope.howToSend == 1) {
			$scope.upload[index] = $upload.upload({
				url: uploadUrl,
				method: $scope.httpMethod,
				headers: {'my-header': 'my-header-value'},
				data : {
					myModel : $scope.myModel
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
			$scope.upload[index].then(function(response) {
				$timeout(function() {
					$scope.uploadResult.push(response.data);
				});
			}, function(response) {
				if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
			}, function(evt) {
				// Math.min is to fix IE which reports 200% sometimes
				$scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
			$scope.upload[index].xhr(function(xhr){
//				xhr.upload.addEventListener('abort', function() {console.log('abort complete')}, false);
			});
		} else {
			var fileReader = new FileReader();
            fileReader.onload = function(e) {
		        $scope.upload[index] = $upload.http({
		        	url: uploadUrl,
					headers: {'Content-Type': $scope.selectedFiles[index].type},
					data: e.target.result
		        }).then(function(response) {
					$scope.uploadResult.push(response.data);
				}, function(response) {
					if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
				}, function(evt) {
					// Math.min is to fix IE which reports 200% sometimes
					$scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
				});
            }
	        fileReader.readAsArrayBuffer($scope.selectedFiles[index]);
		}
	};
	
	$scope.dragOverClass = function($event) {
		var items = $event.dataTransfer.items;
		var hasFile = false;
		if (items != null) {
			for (var i = 0 ; i < items.length; i++) {
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