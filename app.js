import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();

dotenv.config();

const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/masspirg-db";
const PORT = process.env.PORT || 5001;

mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//bodyParser supports req.body 
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

app.listen(PORT, () => {
    console.log(`SERVING ON PORT ${PORT}`);
})