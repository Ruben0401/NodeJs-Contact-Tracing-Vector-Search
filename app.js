const express = require('express');
const bodyParser = require('body-parser');
const { updateUserLocation } = require('./controller/location.controller');
const { pineconeInstance } = require('./config/pinecone.config');

const app = express();
app.use(bodyParser.json());

// Inicializa el índice
pineconeInstance.initPinecone();

app.post('/:userId', updateUserLocation);
app.get('/', (req,res)=>{
    res.status(200).end()
});
app.get('/:test', (req,res)=>{
    const {test} = req.params
    res.status(200).json({message:test})
});

module.exports = app;
