const mongoose = require('mongoose');

const FollowTrackSchema = new mongoose.Schema({
    trackId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track',
    },
    followTrackId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track',
    }
});

module.exports = mongoose.model('FollowTrack', FollowTrackSchema);