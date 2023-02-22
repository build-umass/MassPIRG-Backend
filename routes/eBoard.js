import express from 'express';
import EBoardMember from '../models/eBoardMember.js';
import { getMembers, createMember, deleteMember } from '../controllers/eBoardController.js';
const router = express.Router();

//get all eboard members
router.get('/', getMembers);

//get one eboard member
// router.get('/:id', (req, res) => {
//     req.params.id;
//     console.log(res.send('Eboard member'));
// });

//create eboard member
router.post('/', createMember);

//update eboard member
router.patch('/', (req, res) => {
    req.params.id;
    console.log(res.send('Eboard members'));
});

//delete eboard member
router.delete('/:id', deleteMember);

export default router