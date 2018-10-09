var app;
var server;
var path;
var maxChars;

const server = "127.0.0.1:3000"; // Put your server IP here
const path = "/report" // Put your custom path here.


    // Loads settings from properties.json
    let json = await loadJSON("properties.json");
    app = json.app;
    server = json.server;
    path = json.path;
    maxChars = Number(json.maxChars);


    // Checks if properties are valid and sets them if otherwise
    if(!app) {
        undefErr("App", "report-a-bug");
        app = "report-a-bug";
    }
    if(!server) {
        undefErr("Server", "localhost:3000");
        server = "localhost:3000";
    }
    if(!path) {
        undefErr("Path", "/report");
        path = "/report";
    }
    if(maxChars === NaN) {
        undefErr("MaxChars", "500");
        maxChars = 500;
    }


// Logs an error message
function undefErr(prop, standard) {
    console.error(`${prop} property is not defined. Set to standard (${standard}).`)
}

function addEventListeners() {
    byId("textfield").addEventListener("keyup", maxLen);
    byId("sendButton").addEventListener("click", sendReport);
}

function expandReport() {
    byId("report").classList.toggle("expand");
    byId("report").classList.toggle("hidden");
}

// Calculates remaining characters of the report and prints the value to the screen
function maxLen() {
    let len = byId("textfield").value.length;
    let remain = maxChars - len;
    byId("maxlen").innerHTML = remain;
}

// Assembles the report and calls the post function
function sendReport() {
    let report = encodeURI(byId("textfield").value);
    postReport(`http://${server}${path}`, report, app);
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
}

// Posts the report to the specified server
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


// Wrapper for document.getElementById() to make everything easier
function byId(id) {
    return document.getElementById(id);
}

// Asynchronously loads the properties file
async function loadJSON(path, callback) {
    const response = await fetch("./properties.json");
    if(response.status !== 200) {
        console.log(`Invalid Status Code ${response.status}`);
    }
    return response.json();
}