const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();
const multer = require("multer");
const staticPath = path.join(__dirname, "../public");
const templetsPath = path.join(__dirname, "../templets/partials");
const viewsPath = path.join(__dirname, "../templets/views");
const port = process.env.PORT || 4500;
const { json } = express.json();
require("./db/voterconn");
const Voter = require("./models/voter");
const Candidate = require("./models/candidate");
require("./db/candidateconn");
 
const Storege =multer.diskStorage({
      destination:"public/upload/image",
  filename:(req,file,cb)=>{
    cb(null,file.originalname)
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(templetsPath);

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/candidate_registration", (req, res) => {
  res.render("candidate_registration");
});
app.get("/admin_login", (req, res) => {
  res.render("admin_login");
});
app.get("/voter_login", (req, res) => {
  res.render("voter_login");
});
app.post("/admin_login",(req,res)=>{
  try{
    const admin_id="Votex@2024";
    const admin_pass="@2024Votex";
    if(admin_id===req.body.id && admin_pass===req.body.password){

    }
  }catch(error){
    console.log(error);
  }
})
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
