const mongoose = require('mongoose');
const courtSchema = mongoose.Schema({
    courtName : {
        type: String,
        required: true
    },
    location : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    mobileNumber : {
        type: Number,
        required : true
    },
    description : {
        type: String,
        required : true
    },
    timestamp : {
        type: Date,
        default: new Date()
    },
    courtPic : {
        type: String,
    }
})

const courts = mongoose.model('courts', courtSchema)
module.exports = courts