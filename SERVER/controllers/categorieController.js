
const ObjectID = require('mongoose').Types.ObjectId;

const categorieModel  = require('../models/CategorieModel');
const CategorieModel  = require('../models/CategorieModel');



module.exports.readCategorie = (req, res) => {
    CategorieModel.find((err, docs) => {
        if(!err) res.send(docs);
        else console.log("Error to get data :  " + err);

    })
}

module.exports.readCategorieId= async (req, res) => {
    const cat = await CategorieModel.findById(req.params.id);

    if(!cat){
        res.status(500).json({success: false})
    }
    res.send(cat);
}


module.exports.readCategorieNom = async (req, res) => {

   /* let filter ={};
        if(req.body.nom_categorie)
        {
            res.send(req.body.nom_categorie)
             filter = {nom_categorie:req.body.nom_categorie.split(',')}
             res.send(filter)
       }

    const ca = await CategorieModel.find(filter).select('_id');*/
   //const ca = await CategorieModel.findOne({nom_categorie:req.body.nom_categorie}).select('_id');
  // res.send(req.body.nom_categorie)
  //return(    res.send([req.body.nom_categorie])  ) ;
   const ca = await CategorieModel.find({nom_categorie: req.body.nom_categorie}).select('_id');
   


    if(!ca){
        res.status(500).json({success: false})
    }
    res.send(ca);
}









module.exports.createCategorie = (req, res) => {
    const newRecord = new categorieModel({
        nom_categorie: req.body.nom_categorie,
        description: req.body.description
       
    });
    newRecord.save((err, docs) => {
        if(!err) res.send(docs);
        else console.log('error creating new data   : ' +err);
    })
}


module.exports.updateCategorie = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unkown :" + req.params.id)
    const updateRecord = {
       
        nom_categorie: req.body.nom_categorie,
        description: req.body.description

    } ;
    CategorieModel.findByIdAndUpdate(
        req.params.id,
        {$set: updateRecord},
        {new:true},
        (err, docs)=> {
            if (!err) res.send(docs)
            else console.log("update err"+ err);
        }
    )
    

}
module.exports.deleteCategorie = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unkown :" + req.params.id)
      CategorieModel.findByIdAndDelete(
          req.params.id,
          (err, docs)=> {
            if (!err) res.send(docs)
            else console.log("update err"+ err);
        })

};