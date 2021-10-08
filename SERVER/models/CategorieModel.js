const mongoose = require("mongoose"); 



const CategorieSchema = new mongoose.Schema(

    
    {
        nom_categorie:{
            type: String
            //required: true 
        },
        description:{
            type: String
            
        }




    },
    //{timestamps : true ,}
   
);
module.exports =mongoose.model('Categorie',CategorieSchema);