const mongoose =require("mongoose");

const voterSchema = new mongoose.Schema({

    vname:{
        type:String,
        required:true
    },
    vage:{
        type:Number,
        required:true,
    },
    vid:{
        type:String,
        required:true,
        unique:true
    },
    vadhar:{
        type:Number,
        required:true,
    },
    vpassword:{
        type:String,
        required:true,
        unique:true
    },
    vconpassword:{
        type:String,
        required:true
    },
    vphone:{
        type:String,
        required:true
    },
    vphoto:{
        type:String
    },
    hasVoted: {
        type: Boolean,
        default: false
    }
    
  

    
});
const Voter = new mongoose.model("Voter",voterSchema);
module.exports=Voter;
