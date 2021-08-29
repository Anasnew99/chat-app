import mongoose, { CallbackError,Document } from "mongoose";

const DB_URL = 'mongodb+srv://testcluster.yngue.mongodb.net/chatAppDb?retryWrites=true&w=majority';

const initDB = (onComplete:(error:CallbackError)=>void)=>{
    mongoose.connect(DB_URL, {useNewUrlParser: true,user: process.env.DB_USER, pass: process.env.DB_PWD, useUnifiedTopology: true}, (error)=>{
        onComplete(error);
    })
}


// mongoose.connect()

export default initDB;
