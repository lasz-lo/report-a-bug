const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

var reporters = [];

var port;
var path;
var timeout;
var maxChars;
var reportsFolder;
var applist = [];

initProperties();

function initProperties() {
  let properties = JSON.parse(fs.readFileSync('properties.json', 'utf8'));
  port = properties.port;
  path = properties.path;
  timeout = properties.timeout;
  maxChars = properties.maxChars;
  reportsFolder = properties.reportsFolder;

  if (!fs.existsSync(reportsFolder)){
    console.log(`Created ${reportsFolder} due to nonexistence.`)
    fs.mkdirSync(reportsFolder);
}

  let apps = properties.apps;
  for (var x in apps) {
    if(apps.hasOwnProperty(x)) {
      applist.push(apps[x]);
    }
  }
}

app.use(bodyParser.json());
app.use(cors());

function Reporter(ip, timestamp) {
  this.ip = ip;
  this.timestamp = timestamp;
}

(function() {
  Date.prototype.dateString = function () {
    return `${this.getFullYear()}-${this.getMonth()+1}-${this.getDate()} ${this.getHours()}-${this.getMinutes()}.${this.getMilliseconds()}`;
  };
})();

app.post(path, (req, res) => {
  let ip = req.connection.remoteAddress;
  let reporter = new Reporter(ip, new Date().getTime());
  let contains = false;

  for(let i = 0 ; i < reporters.length ; i++) {
    let currentReporter = reporters[i];
    if(reporter.timestamp - currentReporter.timestamp > timeout) {
      reporters.splice(i, 1);
    } else if(reporter.timestamp - currentReporter.timestamp < timeout && reporter.ip === currentReporter.ip) {
      contains = true;
    }
  }
  if(!contains) {
    reporters.push(reporter);
  }

  console.log('POST /');
  console.log(req.body);

  if(applist.includes(req.body.app) && req.body.report.length <= maxChars && !contains) {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.end('Your report has been sent.');
    let file = `${reportsFolder}/${new Date().dateString()}-${req.body.app}.report`;
    fs.appendFile(file, `Report=${req.body.report}`, function (err) {
      if (err) console.error(err);
      console.log('Saved!');
    })

  } else if(req.body.length > maxChars) {
    res.writeHead(400, {
      'Content-Type': 'text/html',
    });
    res.end('Your report is longer then 500 characters.');
    console.log('Longer then 500 chars.');

  } else if(!applist.includes(req.body.app)) {
    res.writeHead(400, {
      'Content-Type': 'text/html',
    });
    res.end('Your report does not supply a valid app identifier.');
    console.log('No valid app identifier.');

  } else if(contains) {
    res.writeHead(400, {
      'Content-Type': 'text/html',
    });
    res.end(`A report can only be posted every ${timeout/1000} seconds.`);
    console.log('Too much reports.')
  }
});

app.listen(port);
console.log(`Listening on localhost:${port}`);