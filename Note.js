const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const NoteSchema= new Schema(
    {
        Title:{
           type:String,
           required:true
        },
        Description:{
            type:String,
            required:true
         },
        Tags:{
             type:[String],
             required:true
        },
        User_Id:{
            type:mongoose.Types.ObjectId,
        },
        Cat_Id:{
            type:String,
        }
    })

    const Note=mongoose.model('Note',NoteSchema);
    module.exports=Note;