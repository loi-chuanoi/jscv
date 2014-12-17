var host = window.location.href;
if(host.indexOf('localhost')>=0) {
    if(host.indexOf("/index")>0){
        host = host.split("/index")[0];
    }
    var config = {
        "view": "{[namespace]}/Views",
        "cache": false,
        "theme": "",
        "bs": host + "/{[namespace]}/",
        "vendor": "..",
        "index": "index/index",
        "df_server": window.location.protocol + "//" + window.location.host + "",
        js: [
            'libs/chromefix'
        ],
        css: []
    };
}