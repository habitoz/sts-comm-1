const express = require('express');
const pug = require('pug');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { title: 'Chat App' });
});


const ws = new WebSocket('ws://196.188.187.88:3344');

const client = new WebSocket.Server({ server });

const ALLCLIENTS = [];

client.on('connection', (cws) => {
    ALLCLIENTS.push(cws)
    cws.on('message', (message) => {
        ws.send(message);
    });
});


ws.on('open', function open() {
    console.log('Connected to main-server');
    ws.send(JSON.stringify({ event: "ping", message: 'Onpremises app connected' }));
});

ws.on('message', function incoming(data) {
    console.log(`onpremises received: ${data.message}`);
    ALLCLIENTS.forEach(preWs => preWs.send(data))
});
server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
