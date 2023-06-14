const mongoose = require('mongoose');
// mongoose.connect('mongodb://0.0.0.0/employeReviewSystem');
// const pass=6II7Z5UCPKGSUeHL
const DB = "mongodb+srv://aghavganesh34:6II7Z5UCPKGSUeHL@cluster0.cwbyryo.mongodb.net/?retryWrites=true&w=majority"

// These set of line can be written in async await fashion, but I have followed the documentation. 
mongoose.connect(DB).then(()=>{
     console.log('connection successful');
 }).catch((err) => console.log("no connection " + err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open',  function(){
     console.log('Connected to Database :: MongoDB');
});

 
module.exports = db;  