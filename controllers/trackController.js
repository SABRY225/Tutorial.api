const Track = require('../models/trackModel'); 

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
        const { title, description } = req.body;
        const track = new Track({title, description });
        await track.save();
        res.status(201).json({ message: 'Track added successfully', track });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editTrack = async (req, res) => {
    try {
        const trackId = req.params.trackId;
        const updates = req.body;
        const track = await Track.findByIdAndUpdate(trackId, updates, { new: true });
        if (!track) return res.status(404).json({ message: 'Track not found' });
        res.json({ message: 'Track updated successfully', track });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTrack = async (req, res) => {
    try {
        const trackId = req.params.trackId;
        const track = await Track.findByIdAndDelete(trackId);
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

module.exports = {
    getTrack,
    addTrack,
    editTrack,
    deleteTrack,
    getTracks
};
