$(function () {
    getYear();

 

    

    // scrolling
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

    function getYear(){
        var date = new Date();
        var year = date.getFullYear();
        $("#year").text(year);
    }

    var modal = $("#myModal");
    modal.hide();

    $("#bwTest").on("click", function(){
        modal.show();
        modal.on("click", ".close", function(){
            modal.hide();
        })
    });
});
