/*************************************************
/ Create by Huy Nguyen<ngxhuy89@gmail.com>
/ Simple lightway js JSCV[JavaScript-Controller - View]/
/ July 2014 - of vmsoftware projects
/ All Rights Reserved © Copyright huynguyen 2014
/***************************************************/
// register global val
var Action = {};
window.Action = Action;
// end action

function _r(template_name,load_data,not_post_data,in_data){
   return render(template_name,load_data,not_post_data,in_data);
}
// getfile
function _g(filename,func){
    $.ajax({
        url:filename,
        cache:true
    }).done(
        function(data){
            func(data);
        }
    );
}
// render từ ejs ra giao diện
function render(template_name,load_data,not_post_data,in_data){
    var out_data = {"config":config,"in_data":in_data}
    if(load_data){
    var modals = template_name.split("/");
    var data = {};
        data = controller.request(modals[0] + "." + modals[1],null,not_post_data)
        out_data.data = data;
    }
    if(config.theme!=""){
        var template_name = config.view +  "/" + config.theme + "/" + template_name;
    }else{
        var template_name = config.view +  "/" +template_name;
    }
    return (new EJS({"url":template_name}).render(out_data));
}
function render_tpl(template_name,load_data,not_post_data,in_data,tpl){
    var out_data = {"config":config,"in_data":in_data}
    if(load_data){
        var modals = template_name.split("/");
        var data = {};
        data = controller.request(modals[0] + "." + modals[1],null,not_post_data)
        out_data.data = data;
    }
    var template_name = config.view +  "/" +tpl;
    if(config.theme!=""){
        template_name = config.view +  "/" + config.theme + "/" + tpl;
    }
    return (new EJS({"url":template_name}).render(out_data));
}

var jsloop = 0;

/**
 *  Include file script
 * @param file
 */

function include(file){
    if(file.indexOf("/vendor") == 0){
        file = config.bs + "/" + config.vendor + file;
    }else if(file.indexOf("vendor") == 0){
        file = config.bs + "/" + config.vendor + "/" + file;
    }
    $.ajax({
        async: false,
        url:file,
        dataType:"script",
        cache:true
    }).done(function(data){jsloop=0;}).fail(function( jqxhr, settings, exception ) {
       jsloop = jsloop +1;
       if(jsloop <= 5){
           setTimeout(function(){include(file);},1000);
       }else{
       }
    });
}
/*          */
$(function(){
    if(config.bs.substr(config.bs.length-1,1)== "/"){
        config.bs = config.bs.substr(0,config.bs.length-1);
    }
    for(var js in config.js){
        if(config.js[js].indexOf("/vendor") == 0 || config.js[js].indexOf("vendor")){
            include(config.bs  + "/" + config.js[js] );
        }else{
            include(config.js[js]);
        }
    }
    for(var css in config.css){
        if(config.css[css].indexOf("/vendor") == 0 || config.css[css].indexOf("vendor") == 0){
            var cssLink = $("<link rel='stylesheet' type='text/css' href='" + config.bs + "/" + config.vendor + "/" + config.css[css] + "'>");
            $("head").append(cssLink);
        }else{
            var cssLink = $("<link rel='stylesheet' type='text/css' href='" + config.bs + "/" + config.css[css] + "''>");
            $("head").append(cssLink);
        }
    }
    $.when(
        include("/vendor/huynguyen/jscv/ejs.js"),
        include("/vendor/huynguyen/jscv/view.js"),
        include(config.bs + "/controllers/index.js"),
        include("/vendor/huynguyen/jscv/router.js")
    ).done(function(){
        $("body").prepend(_r(config.index,false,false));
        $(document).delegate("[data-view]","click",function(){
             config.currentview = $(this).attr("data-view");
             var place = $(this).attr("data-place");
              if(place.length != 0){
                  config.currentplace = place;
                  if($(this).attr("data-call-modal") == ""){
                      $(place).html(_r(config.currentview,true,true));
                  }else{
                       $(place).html(_r(config.currentview));
                  }
              }
        });
    });
});