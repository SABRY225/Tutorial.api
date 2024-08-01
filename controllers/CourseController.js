const Course = require('../models/courseModel');
const Track = require('../models/trackModel');

const addCourse = async (req, res) => {
    try {
        const { trackId } = req.params;
        const track = await Track.findById(trackId); 
        if (!track) {
            return res.status(404).json({ message: 'Track not found' });
        }
        const { title, description } = req.body;
        const course = new Course({ title, description,trackId });
        await course.save();
        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const editCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json({ message: 'Course edit successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getCourse, getCourses, editCourse, deleteCourse, addCourse
};
