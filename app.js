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
var datum = [""];

app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');
// app.use(session({
//     secret:"hello",
//     resave:false,
//     saveUninitialized:false
//   }));
//   app.use(passport.initialize());
// app.use(passport.session());
mongoose.connect("mongodb+srv://arydroid:06ewt0xm0T@cluster0.lody4r5.mongodb.net/userSDB",{useNewUrlParser:true});
const itemSchema=new mongoose.Schema({
    amount:Number,
    item:String
});
// itemSchema.plugin(passportLocalMongoose);
const List=mongoose.model('List',itemSchema);
app.get("/",function(req,res){
    res.render("home");
});
app.get("/register",function(req,res){
    res.render("data");
});
app.post("/register",function(req,res){
    const myData=new List({
        amount:req.body.num,
        item:req.body.entity
    });
    myData.save();
        // if (err) {
        //     console.error(err);
        //     res.status(500).send('Error saving data to database');
        //   } else {
        //     alert("Data has been stored");
            
        //   }

        //  if(!err){
        // res.redirect("/");
        //  }
        // });
        res.redirect("/ana");
});
// app.get("/ana",function(req,res){
//     res.render("anal")
// });
app.get("/ana",function(req,res){
    List.find().then(function(posts){
        // console.log(post);
        
    
      res.render("ana" ,{posts:posts,data:stuff});
    
    });
    });
app.listen(5000,function(){
    console.log("Server started")
});