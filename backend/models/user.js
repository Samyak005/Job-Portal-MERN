const mongoose = require('mongoose');

const validate = require('mongoose-validator');

var bioValidator = [
    validate({
      validator: 'isLength',
      arguments: [3, 250],
      message: 'Bio should be between {ARGS[0]} and {ARGS[1]} characters',
    }),
  ]

let User = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2
    },
    type:{
        type: String,
        enum: ['J', 'R'],
        default: 'J'
    },

    password:{
        type: String,
        required: true,
        minlength: 2
    },
   
    rating: { // only for applicant
        type: Number,
        default: -1,
        min: -1,
        max: 5
    },

    name: {
        type: String
    },

    emailid: {
        type: String
    },

    contact_number: {
        type: Number,
        min: 1000000000,
        max: 9999999999
    },

    bio: {
        type: String,
        validate : bioValidator
    },
    
    education: {
        type: String,
    },
    
    open_applications: { // only for applicant
        type:Number,
        default: 0
    },

    my_skills: { // only for applicant
        type:String
    },

    if_got_a_job: { // only for applicant
        type: Number,
        default: 0
    },

    image_id: {  // only for applicant
         type: String,
    },

    imagename: {  // only for applicant
        type: String,
    },

    file_id: {  // only for applicant
        type: String
    },

    filename: {  // only for applicant
        type: String
    },

    if_job_recruiter: { // only for applicant
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    if_job_title: {  // only for applicant
        type: String
    },
    
    if_job_date_of_joining: {  // only for applicant
        type: Date
    },
    
    if_job_type: {  // only for applicant
        type: String
    },
    
    // image: { data: Buffer, contentType: String },

    // cv: { // only for applicant
    //     type: String,
    //     default: 0
    // },
});

module.exports = mongoose.model('User', User);