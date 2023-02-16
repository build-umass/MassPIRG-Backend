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
    class: {
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
})

const eBoardMember = mongoose.model('EBoardMember', eBoardMemberSchema);

export default eBoardMember;