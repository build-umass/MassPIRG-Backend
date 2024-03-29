import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eBoardMemberSchema = new Schema({
    name: {
        type: String,
        required: true,
    },   // Ashley Agostinell
    role: {
        type: String,
        required: true,
    },   // Chapter Chair
    classYear: {
        type: Number,
        required: true,
    },  // 2023
    major: {
        type: String,
        required: true,
    },  // Psychology and Linguistics Major
    email: {
        type: String,
        required: true,
    },  // amagostinell@umass.edu
    description: {
        type: String,
        required: true,
    }, // Ashley is the Chair of MASSPIRG Students...
    image: {
        type: String,
    }
})

const eBoardMember = mongoose.model('EBoardMember', eBoardMemberSchema);

export default eBoardMember;