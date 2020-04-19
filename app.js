const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ini = require('ini');
const fs = require('fs');
const Thing = require('./models/thing.js');

const config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

//Création de la variable de connexion mongoDB
const mongoAccess = "mongodb+srv://" + config.database.user + ":" + config.database.password + "@" + config.database.database;


mongoose.connect(mongoAccess ,{
    useNewUrlParser:true,
    useUnifiedTopology:true})
    .then(()=> console.log('Connexion à MongoDB réussie!'))
    .catch(()=> console.log('Problème de connexion à MongoDB'));

const app = express();

app.use(bodyParser.json());


app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/stuff', (req,res,next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
    .then(() => res.status(201).json({message: "L'objet est bien sauvegardé dans la base"}))
    .catch(error => res.status(400).json({error}));
});


app.get('/api/stuff/:id', (req,res,next) => {
    Thing.findOne({_id: req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json(error));
})

app.use('/api/stuff', (req,res,next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}));
})



module.exports = app; 