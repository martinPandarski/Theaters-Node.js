const mongoose = require('mongoose');


const playSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        unique: true
    },
    description : {
        type: String,
        required: true,
        maxLength: 50,
    },
    imageUrl : {
        type: String,
        required: true
    },
    isPublic : {
        type: Boolean,
        default: false
    },
    createdAt : {
        type: Date,
        required: true
    },
    likedByUsers : [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

// playSchema.pre('save', function(next){
//     this.createdAt = new Date();
//     next()
// })

module.exports = mongoose.model('Play', playSchema);