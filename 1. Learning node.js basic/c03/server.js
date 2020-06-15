var express = require("express");
var bodyParser = require("body-parser")
var app = express ();
var http = require('http').createServer(app);
var io = require('socket.io')(http)

/* Sirve contenido estático que envia al servidor al cliente.
En este caso el archivo index.html */
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var messages = [
    {name: 'Tim', message: 'Hi'},
    {name: 'Jane', message: 'Hello'}
]

app.get('/messages', (req, res) => {
    res.send(messages)
})

app.post('/messages', (req, res) => {
    messages.push(req.body)
    io.emit('message', req.body)
    res.sendStatus(200)
})

io.on('connection', (socket) => {
    console.log("user conected")
})

var server = http.listen(3000, () => {
    console.log("Server is listening on port: " + server.address().port)
});