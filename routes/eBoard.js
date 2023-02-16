import express from 'express';
import EBoardMember from '../models/eBoardMember.js';

const router = express.Router();

//get all eboard members
router.get('/', async (req, res) => {
    try {
        const eBoardMembers = await EBoardMember.find();
        res.json(eBoardMembers);
    }
    catch {
        res.status(500).json({ message: err.message });
    }
    console.log(res.send('Eboard members'));
});

//get one eboard member
router.get('/:id', (req, res) => {
    req.params.id;
    console.log(res.send('Eboard member'));
});

//create eboard member
router.post('/', async (req, res) => {
    const eBoardMember = new eBoardMember({
        name: req.body.name,
        role: req.body.role,
        class: req.body.class,
        major: req.body.major,
        email: req.body.email,
        description: req.body.description,
    });
    try {
        const newMember = await eBoardMember.save();
        res.status(201).json(newMember);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//update eboard member
router.patch('/', (req, res) => {
    req.params.id;
    console.log(res.send('Eboard members'));
});

//delete eboard member
router.delete('/:id', (req, res) => {
    req.params.id;
    console.log(res.send('Eboard members'));
});

export default router