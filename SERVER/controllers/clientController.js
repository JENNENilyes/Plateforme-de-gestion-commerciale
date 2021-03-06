//const express = require('express');
//const router = express.Router();
const asyncHandler =require('express-async-handler');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const clientModel = require('../models/ClientModel');
const ClientModel = require('../models/ClientModel');

const ObjectID = require('mongoose').Types.ObjectId;






//get client
module.exports.readClient = (req, res) => {
    ClientModel.find((err, docs) => {
        if(!err) res.send(docs);
        else console.log("Error to get data :  " + err);
    }).select('nom prenom email Num_tel')
}


//router.post('/',(req,res)=>{
module.exports.createClient = (req, res) => {
     let newRecord = new clientModel({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        Num_tel: req.body.Num_tel,
        passwordHash: bcrypt.hashSync(req.body.password,10),
        ville: req.body.ville,
        isAdmin: req.body.isAdmin

    });
    newRecord.save((err, docs) => {
        if(!err) res.send(docs);
        else console.log('error creating new data   : ' +err);
    })
}



//register
module.exports.RegisterClient = (req, res) => {
    let newRecord = new clientModel({
       nom: req.body.nom,
       prenom: req.body.prenom,
       email: req.body.email,
       Num_tel: req.body.Num_tel,
       passwordHash: bcrypt.hashSync(req.body.password,10),
       ville: req.body.ville,
       isAdmin: req.body.isAdmin

   });
   newRecord.save((err, docs) => {
       if(!err) res.send(docs);
       else console.log('error creating new data   : ' +err);
   })
}


//login
module.exports.loginClient = asyncHandler(async (req,res) => {
    const client = await ClientModel.findOne({email: req.body.email})
    const secret = process.env.secret ;
    if(!client) {
        return res.status(400).send('The client not found');
    }
    if(client && bcrypt.compareSync(req.body.password, client.passwordHash)) {
        const token = jwt.sign(
            {
                clientId: client._id,
                isAdmin: client.isAdmin 
            },
            secret
            //{expiresIn : '1d'}
        )
       
        res.status(200).send({client: client.email ,isAdmin: client.isAdmin, token: token}) 
    } else {
       res.status(400).send('password is wrong!');
    }

    
})



//update
//router.put("/:id",(req, res)=> {
module.exports.updateClient = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unkown :" + req.params.id)
    const updateRecord = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        num_tel: req.body.num_tel,
        password: req.body.password,
        ville: req.body.ville
     } ;
      ClientModel.findByIdAndUpdate(
          req.params.id,
          {$set: updateRecord},
          {new:true},
          (err, docs)=> {
              if (!err) res.send(docs)
              else console.log("update err"+ err);
            })
}


module.exports.deleteClient = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unkown :" + req.params.id)
    ClientModel.findByIdAndDelete(
        req.params.id,
        (err, docs)=> {
        if (!err) res.send(docs)
        else console.log("update err"+ err);
    })
};




