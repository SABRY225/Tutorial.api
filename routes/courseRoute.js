const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

const { getCourse, getCourses, editCourse, deleteCourse, addCourse } = require('../controllers/CourseController');

/**
 * @swagger
 * /api/course/single-course/{courseId}:
 *   get:
 *     summary: Get a single course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single course
 */
router.get('/single-course/:courseId', isAuth, getCourse);

/**
 * @swagger
 * /api/course/{trackId}/add-course:
 *   post:
 *     summary: Add a new course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: trackId
 *         schema:
 *           type: string
 *         required: true
 *         description: The track ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course added
 */
router.post('/:trackId/add-course', isAuth, addCourse);

/**
 * @swagger
 * /api/course/edit-course/{courseId}:
 *   put:
 *     summary: Edit an existing course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *         required: true
 *         description: The course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course updated
 */
router.put('/edit-course/:courseId', isAuth, editCourse);

/**
 * @swagger
 * /api/course/delete-course/{courseId}:
 *   delete:
 *     summary: Delete a course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *         required: true
 *         description: The course ID
 *     responses:
 *       200:
 *         description: Course deleted
 */
router.delete('/delete-course/:courseId', isAuth, deleteCourse);

/**
 * @swagger
 * /api/course/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of courses
 */
router.get('/courses', isAuth, getCourses);

module.exports = router;
