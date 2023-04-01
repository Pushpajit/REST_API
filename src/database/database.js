import chalk from "chalk";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config( { path: "./config.env" } )
const uri = process.env.MONGO_ATLAS;

// Connecting with the MongoDB Atlas Cloud. 
async function connectToDatabase(){
    try{
        console.log(chalk.yellow.inverse("Connecting to the database..."));
        const db = await mongoose.connect(uri);
        console.log(chalk.green.inverse("Connection is successfull"));
    }catch(err){
        console.log(chalk.red.inverse(err));
    }

} connectToDatabase();

// Structuring schema for chat.
const chatSchema = mongoose.Schema({
    username: String,
    photoURL: String,
    text: String,
    time: {
        type: Date,
        default: Date.now() 
    }
})



// Creating collection (Table)
const Chats = new mongoose.model("Chats", chatSchema);

export default Chats;