var app;
var server;
var path;

init();

async function init() {

    //FIXME: fetch properties
    loadJSON("properties.json", (json) => {
        app = json.app;
        server = json.server;
        path = json.path;
    })

    addEventListeners();
}

async function loadProperties() {
    let json = await readTextFile("properties.json");
    const properties = JSON.parse();
}

function addEventListeners() {
    byId("textfield").addEventListener("keyup", maxLen);
    byId("sendButton").addEventListener("click", sendReport);
}

function expandReport() {
    byId("report").classList.toggle("expand");
    byId("report").classList.toggle("hidden");
}

function maxLen() {
    let len = byId("textfield").value.length;
    let remain = 500 - len;
    byId("maxlen").innerHTML = remain;
}

function sendReport() {
    let report = encodeURI(byId("textfield").value);

    byId("report").classList.toggle("sent");
    byId("sendButton").classList.toggle("invis");
    byId("maxlen").classList.toggle("invis");
    byId("textfield").classList.toggle("invis");
    setTimeout(function () {
        byId("report").classList.toggle("sent2");
    }, 500);

    setTimeout(function () {
        byId("report").classList.toggle("invis");
    }, 1000);


    postReport(`${server}${path}`, report, app);
}


function postReport(url, report, app) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };
    let content = JSON.stringify({ "report": report, "app": app });
    xhr.send(content);
}


// Wrapper for document.getElementById() to make everything easier.
function byId(id) {
    return document.getElementById(id);
}

function loadJSON(path, callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);
}