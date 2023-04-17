const express = require('express');
const bodyParser = require('body-parser');
const { updateUserLocation } = require('./controller/location.controller');
const { pineconeInstance } = require('./config/pinecone.config');

const app = express();
app.use(bodyParser.json());

// Inicializa el índice
pineconeInstance.initPinecone();

app.put('/:userId', updateUserLocation);
app.get('/', (req,res)=>{
    res.status(200).end()
});

module.exports = app;
