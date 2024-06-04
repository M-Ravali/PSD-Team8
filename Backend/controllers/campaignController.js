const { validationResult } = require('express-validator');
const Campaign = require('../models/Campaign');

// @desc    Create a new campaign
// @route   POST /api/campaign
// @access  Private
exports.createCampaign = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, goalAmount } = req.body;
    const mediaFiles = req.files.map(file => file.path); // Adjust to store file URLs if needed

    try {
        const newCampaign = new Campaign({
            title,
            description,
            goalAmount,
            mediaFiles,
            userId: req.user.id
        });

        const campaign = await newCampaign.save();

        res.json(campaign);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
