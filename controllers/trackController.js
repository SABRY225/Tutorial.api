const Track = require('../models/trackModel');
const FollowTrack = require('../models/followModel');

const getTrack = async (req, res) => {
    try {
        const trackId = req.params.trackId;
        const track = await Track.findById(trackId);
        if (!track) return res.status(404).json({ message: 'Track not found' });
        res.json(track);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addTrack = async (req, res) => {
    try {
        const { title, description, followTrackId } = req.body;

        // Create and save the track
        const track = new Track({ title, description });
        await track.save();

        // Check if followTrackId is provided and valid
        if (followTrackId && followTrackId !== "string") {
            const newFollow = new FollowTrack({ trackId: track._id, followTrackId });
            await newFollow.save();
        }

        // Send success response
        res.status(201).json({ message: 'Track added successfully', track });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};


const editTrack = async (req, res) => {
    try {
        const trackId = req.params.trackId;
        const { title, description, followTrackId } = req.body;

        // Update the track information
        const track = await Track.findByIdAndUpdate(trackId, { title, description }, { new: true });
        if (!track) return res.status(404).json({ message: 'Track not found' });

        // Handling followTrackId logic
        if (!followTrackId || followTrackId === "string") {
            console.log('1');
            // Remove the follow track if followTrackId is empty or "string"
            await FollowTrack.findOneAndDelete({ trackId });
        } else {
            console.log('2');
            // Update or create the follow track
            await FollowTrack.findOneAndUpdate(
                { trackId },
                { followTrackId },
                { new: true, upsert: true } // Use upsert to create if it doesn't exist
            );
        }

        // Send success response
        res.json({ message: 'Track updated successfully', track });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteTrack = async (req, res) => {
    try {
        const trackId = req.params.trackId;
        const track = await Track.findByIdAndDelete(trackId);
        await FollowTrack.findOneAndDelete({trackId});
        if (!track) return res.status(404).json({ message: 'Track not found' });
        res.json({ message: 'Track deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTracks = async (req, res) => {
    try {
        const tracks = await Track.find({});
        res.json(tracks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getFollowTracks = async (req, res) => {
    try {
        const followTrackId = req.params.followTrackId;
        const followTracks = await FollowTrack.find({followTrackId});
        res.json(followTracks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getTrack,
    addTrack,
    editTrack,
    deleteTrack,
    getTracks,
    getFollowTracks
};
