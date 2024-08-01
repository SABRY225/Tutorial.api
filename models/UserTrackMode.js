const mongoose = require('mongoose');

const UserTrackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    trackId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track',
    }
});

module.exports = mongoose.model('UserTrack', UserTrackSchema);