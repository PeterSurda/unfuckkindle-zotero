var outFile;
var inFile;

function install(data, reason) {

    var oFile = Components.classes["@mozilla.org/file/directory_service;1"].
        getService(Components.interfaces.nsIProperties).
        get("ProfD", Components.interfaces.nsIFile);
    oFile.append("zotero")
    if(!oFile.exists()){
//        alert("BS zotero dir not existant " + oFile.path);
    }
    oFile.append("translators");
    if(oFile.exists()){
        this.outFile = oFile;
//        alert("BS having translator dir");
        inFile = null;
        
        var id = "UnFuckKindle@economicsofbitcoin.com";
        Components.utils.import("resource://gre/modules/AddonManager.jsm");
        AddonManager.getAddonByID(id, function(aAddon) {
            inFile = aAddon.getResourceURI("zotero/translators/unfuckkindle.js").QueryInterface(Components.interfaces.nsIFileURL).file;
            copyTranslator();
        });
    }
}

function startup(data, reason) {
// no startup
}

function shutdown(data, reason) {
// no shutdown
}

function uninstall(data, reason) {
    var dFile = Components.classes["@mozilla.org/file/directory_service;1"].
        getService(Components.interfaces.nsIProperties).
        get("ProfD", Components.interfaces.nsIFile);
    dFile.append("zotero")
    dFile.append("translators");
    dFile.append("unfuckkindle.js");
    if(dFile.exists()){
        dFile.remove(false);
    }
}

function  copyTranslator() {
//    alert("BS copying");
    inFile.copyTo(this.outFile, "");
//    alert("BS copyied");
}
