const mongoose =require("mongoose");

const voterSchema = new mongoose.Schema({

    voter_name:{
        type:String,
        required:true
    },
    voter_age:{
        type:Number,
        required:true,
    },
    voter_voterid:{
        type:String,
        required:true,
        unique:true
    },
    voter_addhar:{
        type:String,
        required:true,
    },
    voter_photo:{
        type:String,
        required:true
    }
  

    
});
const Voter = new mongoose.model("Voter",voterSchema);
module.exports = Voter;