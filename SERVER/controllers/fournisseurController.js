
//const express = require('express');
//const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const  FournisseurModel  = require('../models/FournisseurModel');
const {creates}  = require('../utils/errors.utils');

module.exports.readFournisseur = (req,res)=> {
    FournisseurModel.find((err, docs) => {
        if(!err) res.send(docs);
        else console.log("Error to get data :  " + err);

    })
}

module.exports.readFournisseurId= async (req, res) => {
    const four = await FournisseurModel.findById(req.params.id);

    if(!four){
        res.status(500).json({success: false})
    }
    res.send(four);
}


module.exports.createFournisseur = async (req,res)=> {
   try {
    let newRecord = new FournisseurModel({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        num_tel: req.body.num_tel,
        ville: req.body.ville,
    })
    newRecord = await newRecord.save();
    res.send(newRecord)
    
} catch(err){
    const errors = creates(err);
    return res.status(500).send({errors});


}
   // else res.send(newRecord);


   /* newRecord.save((err, docs) => {
        if(err) {
            return res.status(500).send('error creating new data ' );
        }
        else  res.send(docs);
    })*/
}
//update
module.exports.updateFournisseur = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unkown :" + req.params.id)
    const updateRecord = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        num_tel: req.body.num_tel,
        ville: req.body.ville

    } ;
    FournisseurModel.findByIdAndUpdate(
        req.params.id,
        {$set: updateRecord},
        {new:true},
        (err, docs)=> {
            if (!err) res.send(docs)
            else console.log("update err"+ err);
        }
    )
    

}
module.exports.deleteFournisseur = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unkown :" + req.params.id)
      FournisseurModel.findByIdAndDelete(
          req.params.id,
          (err, docs)=> {
            if (!err) res.send(docs)
            else console.log("update err"+ err);
        })

}; 