const mongoose = require('mongoose');

// importing schema class from mongoose module 
const { Schema } = mongoose;

// Note Schema for database
const NoteSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// model method use to create collection (table) as first argument and second argument is the schema 
module.exports = mongoose.model('notes', NoteSchema);