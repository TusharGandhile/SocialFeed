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
    userId: {
        type: String,
        required: true,
      

    }, 
    
    like:[
       
     ],
    comment:[
      
    ],
    show:{
        type: String,
        default:"false"
    },
   

    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feed', feedScheme)