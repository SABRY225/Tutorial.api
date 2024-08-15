const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    titleLesson: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Lesson', LessonSchema);