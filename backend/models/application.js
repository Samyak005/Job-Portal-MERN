const mongoose = require('mongoose');

const validate = require('mongoose-validator');

var sopValidator = [
    validate({
      validator: 'isLength',
      arguments: [3, 250],
      message: 'SOP should be between {ARGS[0]} and {ARGS[1]} characters',
    }),
  ]

let Application = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    status: {
        type: String,
        enum: ['Applied', 'Shortlisted', 'Accepted', 'Rejected', 'Deleted'],
        default: 'Not Applied'
    },

    date_of_application: {
        type: Date
    },

    sop: {
        type: String,
        validate: sopValidator
    }
});

module.exports = mongoose.model('Application', Application);