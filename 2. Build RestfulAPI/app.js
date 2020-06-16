/**
 * Tutorial Youtube
 * Build A Restful Api With Node.js Express & MongoDB | Rest Api Tutorial
 * https://www.youtube.com/watch?v=vjf774RKrLc
 * 
 */

const express = require('express');
const app = express(); // Inicia app express
const bodyParser = require('body-parser'); // Parses req.body to json 
const mongoose = require('mongoose'); // package para conectarse a Mongo
const cors = require('cors');
require('dotenv/config'); // package para usar .env file. En este archivo guardamos conexion db

// Middlewares
// Converts all req.body to json
app.use(cors());
app.use(bodyParser.json())

// Import routes 
const postsRoutes = require('./routes/posts');
app.use('/posts', postsRoutes)

// Route
app.get('/', (req, res) => {
    res.send('We are on home')
})

// Connect to db
mongoose.connect(process.env.DB_CONNECTION, 
{ useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    console.log('Connected to db');
});

// Start listening port 3000
app.listen(3000);
