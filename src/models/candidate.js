const mongoose =require("mongoose");

const candidateSchema = new mongoose.Schema({

    cname:{
        type:String,
        required:true
    },
    cage:{
        type:Number,
        required:true,
    },
    cvoterid:{
        type:String,
        required:true,
        unique:true
    },
    cadhar:{
        type:String,
        required:true,
        unique:true
    },
    cparty:{
        type:String,
        required:true,
        unique:true
    },
    cphoto:{
         type:String
    },
    cphone:{
        type:String,
        requred:true,
        unique:true
   },
    votecount:{
        type:Number,
        default:0
    }

    
});
const Candidate = new mongoose.model("Candidate",candidateSchema);
module.exports= Candidate;
