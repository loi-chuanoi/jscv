var controller = {};
var Rourter =function(){};
Rourter.redirect = function(url){
    location.href = config.df_server + url;
};
if(typeof(config)=="undefined"){
    alert("Vui lòng cấu hình ở file config.js");
}
controller.get_submit_data = function (target){
    var submit_data = {};
    $(target).find("input")
        .each(function (e, input) {
            var input_name = $(input).attr("name");
            if (!input_name) {
                input_name = $(input).attr("id");
            }
            if (input_name) {
                submit_data[input_name] = $(input).val();
            }
        });
    submit_data.target = target;
    return submit_data;
}
controller.submit = function (target) {
    if (target) {
        var api = $(target).attr("data-submit");
        this.request(api, controller.get_submit_data(target));
    }
    return false;
}
controller.request = function (api, data, not_post_data) {
    var r = {};
    if (not_post_data) {
        var v = api.split(".");
        var m = v[0];
        var a = v[1];
        if (eval("window." + m + " == undefined")) {
            $.when(
                include(config.bs + "/controllers/" + m + ".js")
            ).done(function () {
                    r = eval("var m = new " + m + "();m." + a + "(" + JSON.stringify(data) + ");");
            });
        } else {
                    r = eval("var m = new " + m + "();m." + a + "(" + JSON.stringify(data) + ");");
        }
        return r;
    }
    if (config.no_cookies) {
        var token = localStorage.getItem("token");
        if (data == null || data == undefined) {
            data = {}
        }
        ;
        if (token != null && token.length > 10) {
            data.token = token;
        }

    }
    $.ajax({
        url: config.df_server + "/?call=" + api,
        cache: false,
        async: false,
        type: "POST",
        data: data
    }).done(function (data) {
        v = api.split(".");
        m = v[0];
        a = v[1];
        if (eval("window." + m + " == undefined")) {
            $.when(
                include(config.bs + "/controllers/" + m + ".js")
            ).done(function () {
                    r = eval("m = new " + m + "();m." + a + "(" + JSON.stringify(data) + ");");
                });
        } else {
            r = eval("m = new " + m + "();m." + a + "(" + JSON.stringify(data) + ");");
        }
        return r;
    }).error(function () {
        v = api.split(".");
        m = v[0];
        a = v[1];
        if (eval("window." + m + " == undefined")) {
            $.when(
                include(config.bs + "/controllers/" + m + ".js")
            ).done(function () {
                    r = eval("m = new " + m + "();m." + a + "(" + JSON.stringify(data) + ");");
                });
        } else {
            r = eval("m = new " + m + "();m." + a + "(" + JSON.stringify(data) + ");");
        }
        return r;
    });
}
controller.call_api = function (api, in_data, in_func) {
    var results;
    if (config.no_cookies) {
        var token = localStorage.getItem("token");
        if (in_data == undefined || in_data == null) {
            in_data = {}
        };
        if (token != null && token.length > 10) {
            in_data.token = token;
        }

    }
    $.ajax({
        cache: false,
        async: false,
        dataType: "json",
        url: config.df_server + "/?call=" + api,
        method: "POST",
        data: in_data
    }).done(function (data) {
        if (in_func != undefined) {
            results = in_func(data, in_data);
        }
    });
    return results;
}
controller.call_api_async = function (api, in_data, in_func) {
    if (config.no_cookies) {
        var token = localStorage.getItem("token");
        if (in_data == undefined || in_data == null) {
            in_data = {}
        }
        ;
        if (token != null &&  token.length > 10) {
            in_data.token = token;
        }

    }
    $.ajax({
        cache: false,
        async: true,
        dataType: "json",
        url: config.df_server + "/?call=" + api,
        method: "POST",
        data: in_data
    }).done(function (data) {
        if (in_func != undefined) {
            in_func(data, in_data);
        }
    });
}
window.controller = controller;
window.onhashchange=function(e){
    if(typeof(e) == "undefined" || e==null){
        e = {};
        e.newURL=window.location.href;
        e.oldURL = window.location.href;
    }
    var url = e.newURL;
    if(typeof(url)=="undefined" || url==""){
        url = window.location.href;
    }
    var hash = url.split("#")[1];
    if(hash==undefined || hash.length < 1 ){
        hash = "index/index"
    }
    if(hash.indexOf("/")>0){
        var action = hash.split("/")[1];
        hash =  hash.split("/")[0];
        include(config.bs + "/actions/" + hash + ".js");
        eval("Action."+ hash + "." + action + "()");
        window.getCurrentAction = function(){
            return hash;
        };
    }
    else{
            include(config.bs + "/actions/" + hash + ".js");
            eval("Action."+ hash + "()");
            window.getCurrentAction = function(){
                return hash;
            };
    }
    window.Action = {};
}
window.onload=function(){
    if(!config.dev){
        var e = {};
        e.newURL=window.location.href;
        e.oldURL = window.location.href;
        window.onhashchange(e);        
    }
}
function _get(key){
    var hash = window.location.href.split("#")[1];
    if(hash!=undefined && hash.length > 1 ){
        if(hash.indexOf(key+"=")>=0){
            var val = hash.split(key+"=")[1];
            if(val != "" && val.indexOf("&") >=0){
                return val.split("&")[0];
            }else{
                return val;
            }
        }
    }
}
function _fix(key){
    return key.replace("-","");
}
