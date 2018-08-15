$(function () {
    console.log("Hi!");
    getMediumPosts();
});

function getMediumPosts() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40wendymaldonado.la",
        "method": "GET",
        "headers": {
            "accept": "application/json",
            "cache-control": "no-cache"
        }
    }

    $.ajax(settings).done(function (response) {
        var data = response.items;
        var changed = data.slice(0,3);
        
        for(var i = 0; i < changed.length; i++){
            var items = {
                title: data[i].title,
                link: data[i].link,
                thumbnail: data[i].thumbnail,
                date: data[i].pubDate,
                category: data[i].categories[0]
            }
            writeTemplate(items);
        }
    });
}

function loadTemplate() {
    var templateHtml = $("#template").html();
    var template = $(templateHtml);
    return template;
}

function writeTemplate(data) {
    var template = loadTemplate();  
    template.prop("href", data.link);
    template.find(".card-summary").text(data.title);
    template.find(".card-title h3").text(data.category);

    var date    = new Date(data.date),
    yr      = date.getFullYear(),
    month   = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth(),
    day     = date.getDate()  < 10 ? '0' + date.getDate()  : date.getDate(),
    newDate = month + '-' + day + '-' + yr;
  
    template.find(".card-meta").append(newDate);
    template.find(".card-header").css({'background-image': 'url('+ data.thumbnail +')'});

   $(".cards").append(template);
}