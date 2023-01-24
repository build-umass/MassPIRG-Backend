import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eBoardMemberSchema = new Schema({
    name: String,
    role: String,
    class: Number,
    major: String,
    email: String,
    description: String,
})

const EBoardMember = mongoose.model('EBoardMember', eBoardMemberSchema);

export default User;