const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());


const port = 3000;


app.post('/report', (req, res) => {
  console.log('POST /');
  if(req.body.app === "report-a-bug" && req.body.report.length <= 500) {
    console.log(`This is a report from ${req.body.app}`);
    console.log(req.body.report);
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.end('Your report has been sent.');

  } else if(req.body.length > 500) {
    res.writeHead(400, {
      'Content-Type': 'text/html',
    });
    res.end('Your report is longer then 500 characters.');
  } else {
    res.writeHead(400, {
      'Content-Type': 'text/html',
    });
    res.end('Your report does not supply a valid app identifier.');
  }



});


/**
app.get('/r*', (req, res) => {
  let path = req.originalUrl;
  let id = path.substr(3, path.length);
  console.log(id);
  res.redirect('https://www.google.de/');
  res.end();
});
*/

app.listen(port);
console.log(`Listening on localhost:${port}`);