const express=require("express");
const bodyparser=require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");
const passport=require("passport");
const passportLocalMongoose=require("passport-local-mongoose");
const session=require("express-session");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
const stuff = "this is test stuff for post";

app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');
app.use(session({
    secret:"hello",
    resave:false,
    saveUninitialized:false
  }));
  app.use(passport.initialize());
app.use(passport.session());
const userSchema=new mongoose.Schema ({
    email:String,
    password:String
  });
  userSchema.plugin(passportLocalMongoose);
mongoose.connect("mongodb+srv://arydroid:06ewt0xm0T@cluster0.lody4r5.mongodb.net/userSDB",{useNewUrlParser:true});
const itemSchema=new mongoose.Schema({
    amount:Number,
    item:String
});
const User=new mongoose.model("User",userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
const List=mongoose.model('List',itemSchema);
app.get("/",function(req,res){
    res.render("home");
});
app.get("/login",function(req,res){
    res.render("login");
});
app.post("/login",function(req,res){
    const user=new User({
        username:req.body.username,
        password:req.body.password
    });
    req.login(user,function(err){
        if(err){
          console.log(err);
        }
        else{
          passport.authenticate("local")(req,res,function(){
            res.redirect("/data");
          })
        }
      })
})
app.get("/register",function(req,res){
    res.render("register");
});
app.post("/register",function(req,res){
    User.register({username:req.body.username},req.body.password,function(err,user){
      if(err){
        console.log(err);
        res.redirect("/register");
  
      }
      else{
        passport.authenticate("local")(req,res,function(){
          res.redirect("/data");
        });
      }
    });
  
  });
app.post("/data",function(req,res){
    const myData=new List({
        amount:req.body.num,
        item:req.body.entity
    });
    myData.save();
        res.redirect("/ana");
});
// app.get("/ana",function(req,res){
//     res.render("anal")
// });
app.get('/ana', async (req, res) => {
    try {
      const list = await List.find({});
      res.render('ana', {list:list});
    } catch (err) {
      console.error(err);
    }
  });
app.listen(3000,function(){
    console.log("Server started")
});