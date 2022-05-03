const mongoose = require("mongoose");

const feedScheme = new mongoose.Schema({
    photo: {
        type: String,
        required: true,
        min: 6,
        minlength: [4, "min 4 req"]
    },
  
    caption: {
        type: String,
        required: true,
        minlength: [6, "min 6 req"]

    }, 
    like:[
       
     ],
    comment:[
      
    ],

    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feed', feedScheme)