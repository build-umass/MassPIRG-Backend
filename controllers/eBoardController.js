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

export const getMemberById = async (req, res) => {
    try
    {
        const { id } = req.params;
        const foundMember = await EBoardMember.findById(id);
        res.status(201).send({
            message: 'success',
            data: foundMember
        })
    }
    catch (err)
    {
        res.status(500).json({ message: err.message });
    }
}

export const createMember = async (req, res) => {
    const { name, role, classYear, major, email, description, image } = req.body;
    const eBoardMember = new EBoardMember({
        name: name,
        role: role,
        classYear: classYear,
        major: major,
        email: email,
        description: description,
        image: image,
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

export const updateMemberById = async (req, res) => {
    const { id } = req.params;
    const { name, role, classYear, major, email, description, image } = req.body;
    try
    {
        const updatedMember = await EBoardMember.findByIdAndUpdate(id, {
            name: name,
            role: role,
            classYear: classYear,
            major: major,
            email: email,
            description: description,
            image: image,
        }, { new: true });

        if (!updatedMember)
        {
            return res.status(404).send({
                message: 'Member not found',
            });
        }

        res.status(200).json({
            message: 'Member updated successfully',
            data: updatedMember,
        });
    } catch (err)
    {
        res.status(400).json({ message: err.message });
    }
};


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