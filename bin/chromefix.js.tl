$(function(){
    if(navigator.userAgent.indexOf("Chrome/")>0){
        var version = parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2]);
        if(version > 5 && version < 21){
        var cssLink = $("<link rel='stylesheet' type='text/css' href='css/chromefix.css'>");
        $("head").append(cssLink);
        }
    }
});