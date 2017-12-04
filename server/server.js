const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const app = express();

function shuffleArray(array) {
  return array.map((name, i) => {
    let j = Math.floor(Math.random() * (i + 1));
    return array[j]
  })
}

const names = [{name: 'Ben', time: 12 }, {name: 'Dave', time: 21 }, {name: 'Pat', time: 45 }]

app.use(function (req, res) {
  //res.send({ msg: "hello" });
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
  const location = url.parse(req.url, true);

  let timer = setInterval(() => {
    let arr = shuffleArray(names)
    if(ws.readyState === ws.OPEN){
      console.log('Sending:')
      console.log(arr)
      ws.send(JSON.stringify(arr))
    } else if(ws.readyState === ws.CLOSED){
      clearInterval(timer)
    }
  }, 10 * 1001)

  //ws.on('message', function incoming(message) {
  //  console.log('received: %s', message);
  //  ws.send('something');
  //});

  //ws.send('something');
});

server.listen(8081, function listening() {
  console.log('Listening on %d', server.address().port);
});

