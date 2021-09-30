const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const FriendModel = require('./models/Friends');

app.use(cors());
app.use(express.json());

mongoose.connect(
    "mongodb+srv://victor-lira:parafernalha@mern-beginner.yroxz.mongodb.net/tutorialMern?retryWrites=true&w=majority",
    { useNewUrlParser: true }
);

app.get('/read', (req, res) => {
    FriendModel.find({}, (error, result) => {
        if (error) {
            res.send(error);
        } else {
            res.send(result);
        }
    })
})

app.post('/addFriend', async (req, res) => {
    const name = req.body.name;
    const age = req.body.age;

    const friend = new FriendModel({name: name, age: age})
    await friend.save();
    res.send(friend);
})

app.put('/update', async (req, res) => {
    const newAge = req.body.age;
    const id = req.body.id;
    try{
        FriendModel.findById(id, (error, friendToUpdate) => {
            friendToUpdate.age = newAge;
            friendToUpdate.save();
        })
    }catch(error){
        console.log(error)
    }
    res.send('updated')
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    FriendModel.findByIdAndRemove(id).exec();
    res.send('itemdeleted')
})

app.listen("3001", () => {
    return console.log('server is running')
})