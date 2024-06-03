const mongoose= require("mongoose");

mongoose.connect("mongodb://localhost:27017/voting_system",{

}).then(()=>{
    console.log("db candidate connection successful");
}).catch((error)=>{
    console.log(`candidate db connection error ${error}`);
})