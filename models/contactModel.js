const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(

    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref:"User"
        },
        name: {
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