$(function () {
    $("#projects_nav").on("click", function(){
        var position = $("#projects").offset().top;
        $("html, body").animate({ "scrollTop": position }, 1000);
    });
    
    $("#articles_nav").on("click", function(){
        var position = $("#articles").offset().top;
        $("html, body").animate({ "scrollTop": position }, 1000);
    });

    $("#about_nav").on("click", function(){
        var position = $("#aboutme").offset().top;
        $("html, body").animate({ "scrollTop": position }, 1000);
    });

    $("#contact_nav").on("click", function(){
        var position = $("#contactme").offset().top;
        $("html, body").animate({ "scrollTop": position }, 1000);
    });

});
