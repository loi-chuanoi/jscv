var host = window.location.href;
    if (host.indexOf("#") > 0) {
        host = host.split("#")[0];
    }
    if (host.indexOf("/index") > 0) {
        host = host.split("/index")[0];
    }
    var config = {
        "view": "{[namespace]}/Views",
        "cache": false,
        "theme": "",
        "bs": host + "/{[namespace]}/",
        "vendor": "..",
        "index": "index/index",
        "df_server": host,
        js: [
        
        ],
        css: [
            "css/style"
        ]
}