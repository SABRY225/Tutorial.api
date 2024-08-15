const Lesson = require('../models/lessonModel'); 
const Course = require('../models/courseModel'); 
const LessonDetiales = require('../models/lessonDetialeModel'); 

// Get a single lesson
const getLesson = async (req, res) => {
    try {
        const lessonId=req.params.lessonId
        const lesson = await Lesson.findById(req.params.lessonId);
        const lessonDetiales = await LessonDetiales.find({lessonId});
        if (!lesson && !lessonDetiales) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        const newLesson= {
            titleLesson:lesson.titleLesson,
            lessonContent:lessonDetiales[0].lessonContent
        }
        res.status(200).json(newLesson);
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
        const { titleLesson ,lessonContent} = req.body;
        const lessonId=req.params.lessonId
        const lesson = await Lesson.findByIdAndUpdate(lessonId, {titleLesson}, { new: true });
        const lessonDetiales = await LessonDetiales.findOneAndUpdate(lessonId, {lessonContent}, { new: true });
        if (!lesson && !lessonDetiales) {
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
        console.log(req.params.lessonId);
        const lessonId=req.params.lessonId
        const lesson = await Lesson.findByIdAndDelete(req.params.lessonId);
        console.log(lesson);
        const lessonDetiales = await LessonDetiales.findOneAndDelete({lessonId});
        console.log(lessonDetiales);
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
        const { titleLesson, lessonContent } = req.body;
        // console.log('lessonContent',lessonContent);
        const newLesson = new Lesson({ titleLesson,courseId});
        // console.log('newLesson',newLesson);
        const lessonId=newLesson._id
        const savedLesson = await newLesson.save();
        const newLessonDetailes = new LessonDetiales({ lessonId,lessonContent});
        const savednewLessonDetailes = await newLessonDetailes.save();
        // console.log(savednewLessonDetailes);
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
