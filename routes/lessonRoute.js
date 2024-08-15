const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

const { getLesson, getLessons, editLesson, deleteLesson ,addLesson} = require('../controllers/LessonController');

/**
 * @swagger
 * tags:
 *   name: Lesson
 *   description: The Lessons managing API
 */

/**
 * @swagger
 * /api/lesson/single-lesson/{lessonId}:
 *   get:
 *     summary: Get a single lesson
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The lesson description
 *       404:
 *         description: Lesson not found
 */
router.get('/single-lesson/:lessonId', isAuth, getLesson);

/**
 * @swagger
 * /api/lesson/{courseId}/add-lesson:
 *   post:
 *     summary: Add a new lesson to a course
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titleLesson:
 *                 type: string
 *               lessonContent:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *     responses:
 *       200:
 *         description: Lesson added successfully
 *       400:
 *         description: Invalid input
 */
router.post('/:courseId/add-lesson', isAuth, addLesson);

/**
 * @swagger
 * /api/lesson/edit-lesson/{lessonId}:
 *   put:
 *     summary: Edit an existing lesson
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titleLesson:
 *                 type: string
 *               lessonContent:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *     responses:
 *       200:
 *         description: Lesson updated successfully
 *       404:
 *         description: Lesson not found
 */
router.put('/edit-lesson/:lessonId', isAuth, editLesson);

/**
 * @swagger
 * /api/lesson/delete-lesson/{lessonId}:
 *   delete:
 *     summary: Delete a lesson
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lesson deleted successfully
 *       404:
 *         description: Lesson not found
 */
router.delete('/delete-lesson/:lessonId', isAuth, deleteLesson);

/**
 * @swagger
 * /api/lesson/lessons:
 *   get:
 *     summary: Get all lessons
 *     tags: [Lesson]
 *     responses:
 *       200:
 *         description: List of lessons
 */
router.get('/lessons', isAuth, getLessons);

module.exports = router;