$(function () {
    getYear();

    // init
    function getYear(){
        var date = new Date();
        var year = date.getFullYear();
        $("#year").text(year);
    }

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

    // modal
    var modal = $("#myModal");
    var date = new Date().getDate();
    modal.hide();

    $(".showMessage").on("click", function(){
        modal.show();
        $("#date").text(date);
        modal.on("click", ".close", function(){
            modal.hide();
        })
    });
});
