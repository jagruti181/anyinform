var lat=0;
var long=0;
var phonecatControllers = angular.module('phonecatControllers', ['templateservicemod', 'restservice', 'ngRoute']);

phonecatControllers.controller('home',
  function ($scope, TemplateService, RestService, $location) {
        $scope.template = TemplateService;
        TemplateService.header = "views/header.html";
        TemplateService.navigation = "views/navigation.html";
        TemplateService.slider = "views/slider.html";
        TemplateService.content = "views/content.html";
        TemplateService.footer = "views/footer.html";
        TemplateService.footerbottom = "views/footerbottom.html";
        $scope.searchshow=false;
        $scope.searchid="";
    
        $scope.totextbox = function (name,id){
            $("input[name=abc]").val(name);
            $scope.searchid=id;
            $scope.searchshow=false; 
        }
        
        $scope.innershearch = function (){
            $location.url("/subcategory/"+$scope.searchid);
        };
        
        var searchsuccess = function(data, status){
            console.log(data);
            if(data!="")
            {
                $scope.searchdrop=data;
                $scope.searchshow=true;
            }else{
                $scope.searchshow=false;    
                
            }
        };
        $scope.searchlist = function(text){
            console.log(text);
            if(text!="")
            {
                RestService.searchcategory(text).success(searchsuccess);
            }else{
                $scope.searchshow=false;
            }
        }
    
        var getcity = function (data, status){
            console.log(data);
            $scope.cities=data;
        };
        RestService.getallcity().success(getcity);
      // searching 
      
        var searchdata = function (data, status) {
            console.log("in home");
            console.log(data);
        };
        RestService.searchcategory("h").success(searchdata);
      
      
        
      // location lat long
        
        $scope.coords = {};
      
      //Google Maps API Lat Long


        function showPosition2(position) {
            var latlon = position.coords.latitude + "," + position.coords.longitude;
            console.log("Positions:.........");
            console.log(position.coords);
            $scope.coords = position.coords;
            lat = position.coords.latitude;
            long = position.coords.longitude;
            console.log("my distance in km");
            console.log(getDistance(15,12,lat,long));
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition2, showError);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }

  });

phonecatControllers.controller('category',
    function ($scope, TemplateService, RestService, $location, $routeParams) {
        $scope.template = TemplateService;
        TemplateService.content = "views/category.html";
        TemplateService.slider = false;
        TemplateService.navigation = "views/innerheader.html";

        $scope.msg = "";
        $scope.msgarea = false;
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
        var getfilter = function (data, status){
            console.log(data);
            $scope.filters=data;
        };
        RestService.getfilter($routeParams.id).success(getfilter);
    
    //filter to category listing
    $scope.one1="";
        $scope.filterselect = function(iid,name){
            $scope.one1=name;
            $scope.one1="filterselected";
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

        // if 

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

    });

phonecatControllers.controller('about', ['$scope', 'TemplateService',
  function ($scope, TemplateService) {
        $scope.template = TemplateService;
        $scope.menutitle = NavigationService.makeactive("About");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
  }]);

phonecatControllers.controller('login',
  function ($scope, TemplateService) {
        $scope.template = TemplateService;
        TemplateService.content = "views/login.html";
        TemplateService.slider = false;
        TemplateService.navigation = "views/innerheader.html";
    
    
        //signup
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
  }]);




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