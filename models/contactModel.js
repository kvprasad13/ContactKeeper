const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
   { name:{
        type: String,
        required:[true,"Please enter a name"]
    },
    email: {
            type: String,
            required: [true, "Please enter a email address"]
        }, 
        phone: {
            type: String,
            required: [true, "Please enter a phone"]
        }
    }, { timestamps: true });
    

module.exports =mongoose.model("Contact",contactSchema);