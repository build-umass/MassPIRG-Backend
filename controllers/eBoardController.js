import EBoardMember from '../models/eBoardMember.js';

export const getMembers = async (req, res) => {
    try {
        const eBoardMembers = await EBoardMember.find();
        res.status(201).send({
            message: 'success',
            data: eBoardMembers
        })
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
}

export const createMember = async (req, res) => {
    const { name, role, classYear, major, email, description } = req.body;
    const eBoardMember = new EBoardMember({
        name: name,
        role: role,
        classYear: classYear,
        major: major,
        email: email,
        description: description,
    });
    try {
        const newMember = await eBoardMember.save();
        res.status(201).json({
            message: 'Member saved successfully',
            data: newMember,
        });
    }
    catch (err)
    {
        res.status(400).json({ message: err.message });
    }
}

export const deleteMember = async (req, res) => {
    const { id } = req.params;
    try {
        await EBoardMember.findByIdAndDelete(id);
        res.status(200).send({
            message: 'Member deleted successfully',
        })  
    } catch (err)
    {
        res.status(400).json({ message: err.message });
    }

}