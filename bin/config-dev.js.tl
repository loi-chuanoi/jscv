var host = window.location.href;
if (host.indexOf('localhost') >= 0) {
    if (host.indexOf("#") > 0) {
        host = host.split("#")[0];
    }
    if (host.indexOf("/index") > 0) {
        host = host.split("/index")[0];
    }
    var config = {
        "view": "src/Views",
        "cache": false,
        "theme": "",
        "bs": host + "/src/",
        "vendor": "..",
        "index": "index/index",
        "df_server": host,
        js: [
            'Libs/chromefix'
        ],
        css: [
            "src/css/style"
        ]
    };
}