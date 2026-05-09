import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
       username : {
        type: mongoose.Schema.Types.String,
        required:true,
        unique:true,
       },
         displayName :  mongoose.Schema.Types.String,
       
         password : {
        type: mongoose.Schema.Types.String,
        required:true
       },
    }
);

export const User = mongoose.model("User", userSchema)
