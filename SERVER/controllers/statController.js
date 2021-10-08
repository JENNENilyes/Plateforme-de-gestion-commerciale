const ObjectID = require('mongoose').Types.ObjectId;
var mongoose = require('mongoose');

const  StatModel  = require('../models/statModel');


module.exports.readStat = (req, res) => {
    StatModel.find((err, docs) => {
        if(!err) res.send(docs);
        else console.log("Error to get data :  " + err);

    }).populate('fournisseur')
}

module.exports.readStatId= async (req, res) => {
    const cat = await StatModel.findById(req.params.id).populate('Fournisseur');

    if(!cat){
        res.status(500).json({success: false})
    }
    res.send(cat);
}

module.exports.createStat = (req, res) => {

    // if(!mongoose.Types.ObjectId.isValid(req.body.LigneVente))
       //  return res.status(400).send('Invalid LigneVente');
 
     //if(!mongoose.Types.ObjectId.isValid(req.body.client))
   //  return res.status(400).send('Invalid client');
     
     let newRecord = new StatModel({
        fournisseur: req.body.fournisseur,
        produit: req.body.produit,
        note: req.body.note
             });
     newRecord.save((err, docs) => {
         if(!err) res.send(docs);
         else return res.status(500).send('error creating new data   : ' +err);
     })
 } 

 module.exports.readStatNom = async (req, res) => {

    const sta = await StatModel.find({produit: req.body.produit}).select('note fournisseur').populate('fournisseur');
    
 
     if(!sta){
         res.status(500).json({success: false})
     }
     else res.send(sta);
 }