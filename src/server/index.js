const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const port = 3000;

const applist = ['report-a-bug'];

var reporters = [];

function Reporter(ip, timestamp) {
  this.ip = ip;
  this.timestamp = timestamp;
}

(function() {
  Date.prototype.dateString = function () {
    return `${this.getFullYear()}-${this.getMonth()}-${this.getDate()} ${this.getHours()}:${this.getMinutes()}`;
  };
})();

app.post('/report', (req, res) => {
  let ip = req.connection.remoteAddress;
  let reporter = new Reporter(ip, new Date().getTime());
  let contains = false;

  for(let i = 0 ; i < reporters.length ; i++) {
    let currentReporter = reporters[i];
    if(reporter.timestamp - currentReporter.timestamp > 30000) {
      reporters.splice(i, 1);
    } else if(reporter.timestamp - currentReporter.timestamp < 30000 && reporter.ip === currentReporter.ip) {
      contains = true;
    }
  }
  if(!contains) {
    reporters.push(reporter);
  }

  console.log('POST /');

  if(applist.includes(req.body.app) && req.body.report.length <= 500 && !contains) {
    console.log(`This is a report from ${req.body.app}`);
    console.log(req.body.report);
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.end('Your report has been sent.');
    fs.appendFile('reports.log', `${new Date().dateString()}\nApp=${req.body.app}\nReport=${req.body.report}\n\n`, function (err) {
      if (err) throw err;
      console.log('Saved!');
    })

  } else if(req.body.length > 500) {
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
    res.end('A report can only be posted every 30 seconds.');
    console.log('Too much reports.')
  }
});

app.listen(port);
console.log(`Listening on localhost:${port}`);