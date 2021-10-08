const mongoose = require("mongoose");



var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const FournisseurSchema = new mongoose.Schema(
  

    {
        nom:{
            type: String,
            required: true ,
            minLength:3,
            maxLength: 5 
        },
        prenom:{
            type: String,
            required: true ,
        },
        email:{
            type: String,
            required: true ,
            unique: true,
            validate: [validateEmail, 'Please fill a valid email address']
        },
        num_tel:{
            type: String
           // required: true 
        },
        
        ville:{
            type: String
            
        }




    },
    //{ timestamps : true ,}
     
);
module.exports = mongoose.model('Fournisseur',FournisseurSchema);