import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eBoardMemberSchema = new Schema({
    name: String,   // Ashley Agostinell
    role: String,   // Chapter Chair
    class: Number,  // 2023
    major: String,  // Psychology and Linguistics Major
    email: String,  // amagostinell@umass.edu
    description: String, // Ashley is the Chair of MASSPIRG Students...
})

const EBoardMember = mongoose.model('EBoardMember', eBoardMemberSchema);

export default User;