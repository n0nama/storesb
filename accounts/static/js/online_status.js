/**
 * Created by V_Yamchinov on 31.10.2016.
 */
function checkOnline(host) {
    var ws = new WebSocket(host);
    ws.onopen = function (e) {
        console.log("Connected");
    }
    ws.onclose = function (e) {
        console.log("Closed");
    }
    window.onbeforeunload = function() {
        ws.close();
    }
}