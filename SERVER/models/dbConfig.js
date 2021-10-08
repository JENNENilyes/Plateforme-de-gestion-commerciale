/*const mongoose = require('mongoose');
mongoose.connect(
    "mongodb://localhost:27017/pcd-api",
    {useNewUrlParser: true  , useCreateIndex: true,useUnifiedTopology:true,useFindAndModify: false,},
    (err)=> {
        if(!err) console.log("Mongodb connected");
        else console.log("connection error :" + err);
    }

)*/
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://ziw:houssemcss@cluster0.oiafh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser: true  ,
     useCreateIndex: true,
     useUnifiedTopology:true,
     useFindAndModify: false,
    dbName:'e_shop'
})
.then(()=>{
    console.log('data base connection is ready');
})
.catch((err)=>{
    console.log(err);
})