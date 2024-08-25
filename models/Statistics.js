// models/Statistics.js
const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
    endpoint: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Statistics = mongoose.model('Statistics', statisticsSchema);

module.exports = Statistics;