var express = require("express");
var bodyParser = require("body-parser")
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http)
var mongoose = require('mongoose');

/* Sirve contenido estático que envia al servidor al cliente.
En este caso el archivo index.html */
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var dbUrl = "mongodb+srv://newUser:123456pruebas@apibooks-9ntso.mongodb.net/learning-node?retryWrites=true&w=majority"

var Message = mongoose.model('Message', {
    name: String,
    message: String
})

var messages = [
    { name: 'Tim', message: 'Hi' },
    { name: 'Jane', message: 'Hello' }
]

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        if(err){
            sendStatus(500)
        }
        else{
            res.send(messages)
        }
    })
})

app.post('/messages', (req, res) => {
    var message = new Message(req.body)
    message.save((err) => {
        if (err) {
            sendStatus(500)
        }
        else {
            io.emit('message', req.body)
            res.sendStatus(200)
        }
    })
})

io.on('connection', (socket) => {
    console.log("user conected")
})

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    console.log('Mongo db connection ', error)
})

var server = http.listen(3000, () => {
    console.log("Server is listening on port: " + server.address().port)
});