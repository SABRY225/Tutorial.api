const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const { getTrack, getTracks, editTrack, deleteTrack, addTrack, getFollowTracks } = require('../controllers/trackController');

/**
 * @swagger
 * /api/track/single-track/{trackId}:
 *   get:
 *     summary: Get the authenticated user's track details
 *     tags: [Track]
 *     parameters:
 *       - in: path
 *         name: trackId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Track details
 *       404:
 *         description: Track not found
 *       500:
 *         description: Server error
 */
router.get('/single-track/:trackId', isAuth, getTrack);

/**
 * @swagger
 * /api/track/followTracks/{followTrackId}:
 *   get:
 *     summary: Get the authenticated user's track details
 *     tags: [Track]
 *     parameters:
 *       - in: path
 *         name: followTrackId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: FollowTracks details
 *       404:
 *         description: FollowTracks not found
 *       500:
 *         description: Server error
 */
router.get('/followTracks/:followTrackId', isAuth, getFollowTracks);


/**
 * @swagger
 * /api/track/add-track:
 *   post:
 *     summary: Add a new track
 *     tags: [Track]
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
 *               followTrackId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Track added
 *       500:
 *         description: Server error
 */
router.post('/add-track', isAuth, addTrack);

/**
 * @swagger
 * /api/track/edit-track/{trackId}:
 *   put:
 *     summary: Edit a track's details
 *     tags: [Track]
 *     parameters:
 *       - in: path
 *         name: trackId
 *         required: true
 *         schema:
 *           type: string
 *         description: The track's ID
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
 *               followTrackId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Track updated
 *       404:
 *         description: Track not found
 *       500:
 *         description: Server error
 */
router.put('/edit-track/:trackId', isAuth, editTrack);

/**
 * @swagger
 * /api/track/delete-track/{trackId}:
 *   delete:
 *     summary: Delete a track
 *     tags: [Track]
 *     parameters:
 *       - in: path
 *         name: trackId
 *         required: true
 *         schema:
 *           type: string
 *         description: The track's ID
 *     responses:
 *       200:
 *         description: Track deleted
 *       404:
 *         description: Track not found
 *       500:
 *         description: Server error
 */
router.delete('/delete-track/:trackId', isAuth, deleteTrack);

/**
 * @swagger
 * /api/track/tracks:
 *   get:
 *     summary: Get a list of all tracks
 *     tags: [Track]
 *     responses:
 *       200:
 *         description: List of tracks
 *       500:
 *         description: Server error
 */
router.get('/tracks', isAuth, getTracks);

module.exports = router;
