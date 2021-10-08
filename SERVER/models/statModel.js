const mongoose=require('mongoose');

const statSchema = new mongoose.Schema({

    fournisseur:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fournisseur'    },
    produit:  {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produit' 
    }  ,
    note: {type:Number}
    


});

module.exports = mongoose.model('Stat', statSchema );

