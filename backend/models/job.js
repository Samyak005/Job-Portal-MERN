const mongoose = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

let Job = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    
    salary: {
        type: Number,
        required: true
    },

    positions: { // max_positions
        type: Number,
        required: true
    },

    remaining_positions: {
        type:Number
    },

    no_applications: {
        type: Number,
        default: 0
    },
    // added for name and email id of recruiter
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    date_of_posting: {
        type: Date,
        default: () => Date.now()
    },

    date_of_joining: {
        type: Date,
    },

    deadline_for_application: {
        type: Date,
    },

    isDeleted: {
        type: Boolean,
        default: false,
    },

    type:{
        type: String,
        enum: ['FT', 'PT', 'WFH'],
        default: 'FT'
    },

    duration:{
        type: Number,
        default: 0
    },

    skillset:{
        type: String,
    },

    max_no_applications:{
        type: Number
    },

    full:{
        type: Boolean,
        default: false
    },

    applied:{  // for button
        type: Boolean,
        default: false
    },

    sum_of_rating:{
        type:Number,
        default:0
    },

    no_of_rating:{
        type:Number,
        default:0
    },

    rating:{
        type:Number,
        default:-1,
        min:-1,
        max:5
    },

    show:{    // for filter search purpose
        type:Boolean,
        default:true
    }
});

// const EventsSchema = mongoose.Schema(Job);
// EventsSchema.
Job.plugin(mongoose_fuzzy_searching, {fields: ['title']});
// const Events = mongoose.model('Events', EventsSchema);
// Events.fuzzySearch('Nodejs meetup').then(console.log).catch(console.error);

module.exports = mongoose.model('Job', Job);