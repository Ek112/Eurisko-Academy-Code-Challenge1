const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema= new Schema(
    {
        Email:{
           type:String,
           required:true
        },
        Password:{
            type:String,
            required:true
         },
         Is_Logged:{
            type:Boolean,
            default:false
         }
    })

    const User=mongoose.model('User',UserSchema);
    module.exports=User;