const express = require('express');
const Statistics = require('../models/Statistics');
const router = express.Router();

router.get('/last-called', async (req, res) => {
    try {
        const lastCalled = await Statistics.findOne().sort({ timestamp: -1 });
        res.status(200).json(lastCalled);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching last called endpoint' });
    }
});

router.get('/most-frequent', async (req, res) => {
    try {
        const mostFrequent = await Statistics.aggregate([
            { $group: { _id: "$endpoint", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);
        res.status(200).json(mostFrequent[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching most frequent endpoint' });
    }
});

router.get('/endpoint-counts', async (req, res) => {
    try {
        const endpointCounts = await Statistics.aggregate([
            { $group: { _id: "$endpoint", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        res.status(200).json(endpointCounts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching endpoint counts' });
    }
});

router.post('/', async (req, res) => {
    const { klicanaStoritev } = req.body;
    try {
        const logEntry = new Statistics({ endpoint: klicanaStoritev });
        await logEntry.save();
        res.status(200).json({ message: 'Log entry saved' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving log entry' });
    }
});

module.exports = router;