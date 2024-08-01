const Lesson = require('../models/lessonModel'); 
const Course = require('../models/courseModel'); 

// Get a single lesson
const getLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.lessonId);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        res.status(200).json(lesson);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all lessons
const getLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find({});
        res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Edit an existing lesson
const editLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findByIdAndUpdate(req.params.lessonId, req.body, { new: true });
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        res.status(200).json(lesson);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a lesson
const deleteLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findByIdAndDelete(req.params.lessonId);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        res.status(200).json({ message: 'Lesson deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Add a new lesson
const addLesson = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId); 
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        const { title, content } = req.body;
        const newLesson = new Lesson({ title, content,courseId});
        const savedLesson = await newLesson.save();
        res.status(201).json(savedLesson);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getLesson,
    getLessons,
    editLesson,
    deleteLesson,
    addLesson,
};
