const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    trackId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track',
    }
});

module.exports = mongoose.model('Course', CourseSchema);