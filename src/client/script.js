const app = "report-a-bug"; // Put your app-identifier here

const server = "127.0.0.1:3000"; // Put your server IP here
const path = "/report" // Put your custom path here.


addEventListeners();



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


    postReport("http://127.0.0.1:3000/report", report, app);
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