const mongoose =require("mongoose");

const candidateSchema = new mongoose.Schema({

    candidate_name:{
        type:String,
        required:true
    },
    candidate_age:{
        type:Number,
        required:true,
    },
    candidate_voterid:{
        type:String,
        required:true,
        unique:true
    },
    candidate_addhar:{
        type:String,
        required:true,
    },
    candidate_party:{
        type:String,
        required:true,
        unique:true
    },
    candidate_photo:{
         type:String,
         requred:true
    },
    votecount:{
        type:Number,
        default:0
    }

    
});
const Candidate = new mongoose.model("Candidate",candidateSchema);
module.exports = Candidate;