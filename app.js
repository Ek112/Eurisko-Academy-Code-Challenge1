const express=require('express');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.json());
const mongoose= require('mongoose');
const Note=require('./models/Note');
const User=require('./models/User');
const Category = require('./models/Category');
//connect to the db on the shared cluster in mongodb
const dbUri="mongodb+srv://eliek:eliek1234@cluster0.3tcx6jl.mongodb.net/NotesAppDb"
mongoose.connect(dbUri)then((res)=>{app.listen(3000);consolelog('connected successfully!')}).catch((err)=>console.log(err))

app.post('/add-category',(req,res)=>{ 
const cat=new Category(req.body);
cat.save().then((result)=>{res.send(result)}).catch((err)=>{res.send(err)})          
})

app.post('/edit-category/:id',(req,res)=>{

Category.findByIdAndUpdate(req.params.id,req.body,{new:true}).then((result)=>res.send(result)).catch((err)=>res.send(err));        
})

app.put('/delete-category/:id',(req,res)=>{
  
Category.findByIdAndDelete(req.params.id).then((result)=>res.send(tresult)).catch((err)=>res.send(err));        
})

app.get('/get-allcategory',(req,res)=>{
    Category.find().then((result)=>res.send(result)).catch((err)=>res.send(err))
})

app.get('/get-category/:id',(req,res)=>{
    Category.findById(req.params.id).then((result)=>res.send(result)).catch((err)=>res.send(err));
})
      
   


app.post('/add-note',(req,res)=>{

User.find({Email:req.body.Email,Is_Logged:true}).then(
    (user)=>{
        if(user.length){
            Category.find({Name:req.body.Category}).then((category)=>{
                if(category.length){
                const note=new Note({Title:req.body.Title,Description:req.body.Description,Tags:req.body.Tags,User_Id:user[0]._id,Cat_Id:category[0]._id});
                note.save().then((result)=>{res.send(result)}).catch((err)=>{res.send(err)});
                }
                else{ 
                    res.send("Category not found!");
                }
            })
            }
         else{
             res.send("User Not Logged In! Please Login");
         }
    }
)  
})


app.get('/get-notes',(req,res)=>{
    User.find({Email:req.body.Email,Is_Logged:true}).then(
        (user)=>{
            if(user.length){
    Note.find({User_Id:user[0]._id}).then((result)=>{res.send(result)}).catch((err)=>{res.send(err)});
            }
            else{
                res.send("User Not Logged In! Please Login");
            }

}
}

app.get('/getnotebytag',(req,res)=>{
    User.find({Email:req.body.Email,Is_Logged:true}).then(
        (user)=>{
            if(user.length){
    Note.find({Tags:req.body.Tag,User_Id:user[0]._id}).then((result)=>{res.send(result)}).catch((err)=>{res.send(err)});
            }
            else{
                res.send("User Not Logged In! Please Login");
            }
})

)

app.get('/getnotebycategory',(req,res)=>{
    User.find({Email:req.body.Email,Is_Logged:true}).then(
        (user)=>{
            if(user.length){
                Category.find({Name:req.body.Category}).then((category)=>{
                    if(category.length){
                    Note.find({Cat_Id:category[0]._id,User_Id:user[0]._id}).then((result)=>{res.send(result)}).catch((err)=>{res.send(err)});
                    }
                    else{
                        res.send("Category not found !");
                    }
            })}
            else{
                res.send("User Not Logged In! Please Login");
            }
})
})

app.put('/edit-note/:id',(req,res)=>{
    User.find({Email:req.body.Email,Is_Logged:true}).then(
        (user)=>{
            if(user.length){
    Note.findoneAndUpdate({_id:req.params.id,User_Id:user[0]._id},req.body,{new:true}).then((result)=>{res.send(result)}).catch((err)=>{res.send(err)});
            }
            else{
                res.send("User Not Logged In! Please Login");
            }
})
}
)

app.post('/delete-note/:id',(req,res)=>{
    User.find({Email:req.body.Email,Is_Logged:true}).then(
        (user)=>{
            if(user.length){
    Note.findoneAndDelete({_id:req.params.id,User_Id:user[0]._id}).then((result)=>{res.send(result)}).catch((err)=>{res.send(err)});
            }
            else{
                res.send("User Not Logged In! Please Login");
            }
})
}
)

app.post(/signup,(req,res)=>{
const user=new User(req.body);
user.save().then((result)=>res.send("Successfully Signed up!")).catch((er)=>res.send(er));
})
//2-login user
app.post('/login',(req,res)=>{
    //console.log(req.body);
User.findOneAndUpdate({Email:req.body.Email,Password:req.body.Password},{ Is_Logged: true }).then((result)=>{if(result!=null)res.send("login successfull!");else res.send("wrong email or password !");}).catch((er)=>res.send(er));
})