const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    userid: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    // address: TempSchema
})


mongoose.models = {} //nextjs
module.exports = mongoose.model('Users', UsersSchema);