const Thing = require('../models/Thing');
const express = require('express');

exports.createThing = (req,res,next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
    .then(() => res.status(201).json({message: "L'objet est bien sauvegardé dans la base"}))
    .catch(error => res.status(400).json({error}));
    
};

exports.readAllThing = (req,res,next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}));   
};

exports.readOneThing = (req,res,next) => {
    Thing.findOne({_id: req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json(error));
};

exports.updateThing = (req,res,next) => {
    Thing.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
    .then(() => res.status(200).json({message: "Objet modifié"}))
    .catch(error => res.status(404).json({error}));
};

exports.deleteThing = (req,res,next) => {
    Thing.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({message: "Objet supprimé"}))
    .catch(error => res.status(404).json({error}));
};

