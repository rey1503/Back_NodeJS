const mongoose = require('mongoose');
const NewUser = mongoose.model('newuser', {
    Name: {
        type: String
    },
    Mail: {
        type: String,
    },
    Telephone: {
        type: Number,
    },
    Password: {
        type: String,
    },
    Age: {
        type: Number,
    },
    Gender: {
        type: String,
    },
    Hobby: {
        type: String,
    },
    Date: {
        type: Date,
    },
})
module.exports = NewUser;