import express from 'express';
import EBoardMember from '../models/eBoardMember.js';
import { getMembers, getMemberById, createMember, updateMemberById, deleteMember } from '../controllers/eBoardController.js';
import { verifyToken } from '../middlewares/middlewares.js';

const router = express.Router();

//get all eboard members
router.get('/', getMembers);
router.get('/:id', getMemberById);

//get one eboard member
// router.get('/:id', (req, res) => {
//     req.params.id;
//     console.log(res.send('Eboard member'));
// });

//create eboard member
router.post('/', verifyToken, createMember);

//update eboard member
router.patch('/:id', verifyToken, updateMemberById);

//delete eboard member
router.delete('/:id', deleteMember);

export default router