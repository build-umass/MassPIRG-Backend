//THIS FILE IS USED TO CREATE INITIAL DATA IN THE DATABASE
import mongoose from 'mongoose';
import { members } from './seedsHelper.js'
import EBoardMember from '../models/eBoardMember.js'

mongoose.connect('mongodb://localhost:27017/masspirg-db');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//Return a random element from an array
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await EBoardMember.deleteMany({});
    for (let i = 0; i < members.length; ++i)
    {
        const member = new EBoardMember({
            ...members[i]
        })
        await member.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
