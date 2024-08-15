const mongoose = require('mongoose');

const LessonDetialesSchema = new mongoose.Schema({
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
    },
    lessonContent: [
        {
            title: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            },
        }
    ],
});

module.exports = mongoose.model('LessonDetiales', LessonDetialesSchema);