const express = require('express');
const port = 3000;
const mongoose = require('mongoose');
const path = require('path')
const app = express()


// EXRESS JS MIDDLEWARE AND STATIC FILE PART
const bodyParser = require('body-parser');
// Configure the body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

//  MONGO DB PART
mongoose.connect('mongodb://localhost:27017/students', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    city : String,
    state : String,
    zip: Number,
});

const User = mongoose.model('User', userSchema);



// GET REQUEST
app.get('/', (req,res)=>{
    res.status(400).sendFile(__dirname + '/index.html')
})

//POST REQUEST AND FORM SUBMISSION
app.post('/submit', (req, res) => {
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const city1 = req.body.city;
    const state1 = req.body.state;
    const zip1 = req.body.zip;

    console.log(`${firstName}`);
    console.log(`${lastName}`);

    const newUser = new User({
        firstname: firstName,
        lastname: lastName,
        city : city1,
        state : state1,
        zip : zip1,
    });

    // Save the document to the database using Promises
    newUser.save()
        .then(() => {
            console.log("User saved successfully");
            res.status(200).redirect('/thankyou.html')
        })
        .catch(err => {
            console.error("Error saving the user", err);
            res.status(500).send("Error saving the user");
        });
});


// LISTENING THE PORT
app.listen(port,()=>{
    console.log(`server is listening at ${port}`)
})

