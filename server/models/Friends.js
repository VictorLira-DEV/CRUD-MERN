const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    age: {
        type: Number
    }
})

const FriendModel = mongoose.model('friends', FriendSchema);
module.exports = FriendModel