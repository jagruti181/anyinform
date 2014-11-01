var templateservicemod = angular.module('templateservicemod', []);
templateservicemod.service('TemplateService', function () {
    this.title = "Home";
    this.meta = "Google";
    this.metadesc = "Home";

    this.header = "views/header.html";
    this.navigation = "views/navigation.html";
    this.slider = "views/slider.html";
    this.content = "views/content.html";
    this.footer = "views/footer.html";
    this.footerbottom = "views/footerbottom.html";
    
    var d=new Date();
    this.year=d.getFullYear();
});