const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();
const multer=require("multer");
const staticPath = path.join(__dirname, "../public");
const templetsPath = path.join(__dirname, "../templets/partials");
const viewsPath = path.join(__dirname, "../templets/views");
const port = process.env.PORT ||4500;
const { json } = express.json();
require("./db/voterconn");
const Voter= require("./models/voter");
const Candidate = require("./models/candidate");
require("./db/candidateconn");

const Storage=multer.diskStorage({
  destination:"public/uploade/image",
  filename:(req,file,cb)=>{
    cb(null, file.originalname);
  }
});
const Save=multer.diskStorage({
  destination:"public/uploade/cimage",
  filename:(req,file,cb)=>{
    cb(null, file.originalname);
  }
});
const upload=multer({
       storage:Storage
});
const saved=multer({
       storage:Save
});

// const session = require('express-session');

// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: false
// }));



app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(templetsPath);


app.use('/public', express.static(staticPath));
//home page 
app.get("/", (req, res) => {
  res.render("index");
});

//voter login
app.get("/voter_login",(req,res)=>{
  res.render("voter_login");
});

app.get("/work",(req,res)=>{
  res.render("work");
});
app.get("/contact",(req,res)=>{
  res.render("contact");
});
//admin login
app.get("/admin_login",(req,res)=>{
  res.render("admin_login");
});

// voter registration
app.get("/voter_registration",(req,res)=>{
  res.render("voter_registration");
});

//candidate registration 
app.get("/candidate_registration",(req,res,next)=>{
  res.render("candidate_registration");
})

//registration post 
app.post("/voter_registration",upload.single("photo"),async(req,res)=>{
    try{
      const password=req.body.voter_password;
      const conpassword=req.body.voter_conpassword;
      if(password===conpassword){
        const newVoters =new Voter({
          voter_name:req.body.voter_name,
          voter_age:req.body.voter_age,
          voter_voterid:req.body.voter_id,
          poter_addhar:req.body.voter_aadhar,
          poter_phone:req.body.voter_phone,
          voter_password:req.body.password,
          voter_conpassword:req.body.voter_conpassword,
          voter_photo:req.file.filename

         })
         const voter = await newVoters.save();
         res.status(200).render("index");
      }else{
        res.status(400).send("invalid id and password");
      }

    }catch(error){
      res.status(400).send(error);
    }
});


// voter login post
// voter login post
app.post("/voter_login", async (req, res) => {
  try {
    const id = req.body.vid;
    const password = req.body.vpass;

    const voter = await Voter.findOne({ voterid: id });
    if (voter && voter.password === password) {
      // Store voter ID in session upon successful login
      req.session.voterId = voter._id;

      const candidates = await Candidate.find(); // Fetch all candidates
      res.status(201).render("voter_dashboard", { voter, candidates, hasVoted: voter.hasVoted });
    } else {
      res.send("Invalid voter ID or password");
    }
  } catch (error) {
    res.status(400).send("Invalid voter ID or password");
  }
});




// admin login post
app.post("/admin_login", (req, res) => {
  const id = "sahu";
  const password = "123";
  console.log(req.body)
  if (req.body.admin_id ===id && req.body.admin_password === password) {
    res.render("candidate_registration");
  } else {
    res.status(400).send("Invalid admin ID or password");
  }
});




// candidate post
app.post("/candidate_registration", saved.single("photo"), async (req, res) => {
  try {
    const newCandidate = new Candidate({
      candidate_name: req.body.Candidate_Name,
      candidate_age: req.body.Candidate_Age,
      candidate_voterid: req.body.Candidate_VoterId,
      candidate_addhar: req.body.Candidate_Aadhar,
      candidate_party: req.body.Candidate_party,
      candidate_photo: req.body.Candidate_photo
    });

    const candidate= await newCandidate.save();
    
    console.log(candidate);
    const candidates = await Candidate.find(); // Fetch all candidates
    res.status(201).render("candidate_registartion", { candidates });

  } catch (error) {
    res.status(400).send(error);
  }
});



//for votes

app.post("/vote", async (req, res) => {
  try {
    const candidateId = req.body.candidateId;
    const voterId = req.session.voterId; 

    const candidate = await Candidate.findById(candidateId);
    if (candidate) {
      candidate.votes += 1;
      await candidate.save();

      // Update the voter's status to has voted
      const voter = await Voter.findById(voterId);
      voter.hasVoted = true;
      await voter.save();

      res.status(200).send({ message: "Vote counted successfully" });
    } else {
      res.status(404).send({ message: "Candidate not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error counting vote", error });
  }
});





app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});


