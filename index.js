const express=require("express");
const app=express();
const port=8080;
const {v4:uuidv4}=require('uuid');
const methodOverrride=require("method-override");

app.use(methodOverrride('_method'));

const path=require("path");

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username:"tt0101",
        content:"I love coding!"
    },
    {
        id:uuidv4(),
        username:"tanmaytyagi2003",
        content:"I got my first Internship!"
    },
    {
        id:uuidv4(),
        username:"tarunkumar",
        content:"I like Web Development!"
    }
]//not const because we have to provide delete functionality also

app.listen(port,()=>{
    console.log("listening on port : 8080");
})

app.get("/posts", (req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new", (req,res)=>{
    
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("show.ejs",{post});
})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    let newContent=req.body.content;
    post.content=newContent;
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!=p.id);
    res.redirect("/posts");
})