const mongoose = require("mongoose");
const userScheme = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
       
        minlength: [4, "min 4 req"]
    },
    lastName: {
        type: String,
        required: true,
      
        minlength: [4, "min 4 req"]
    },
   name: {
        
           
      
       
    },
    email: {
        type: String,
        required: true,
        minlength: [6, "min 6 req"]
    },
    photo: {
       
        
        
       
              
    },
    bio: {
          
         
    },
    gender: {
       
            
    },
    mobile: {
           
        
    },
    dob: {
              
      
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "min 6 req"]
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userScheme)