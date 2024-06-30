require('dotenv').config()


const express = require('express');
const mongoose = require('mongoose');
const createUserRouter = require('./controller/createUser');
const cors = require('cors');
const loginUser = require('./controller/loginUser');
const secureTest = require('./controller/testSecure');
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Connect to MongoDB

const connectDb = mongoose.connect('mongodb://localhost:27017/chat');


app.use('/api/signup', createUserRouter)
app.use('/api/login', loginUser)
app.use('/api/secure-test',secureTest)

app.get('/', async (req, res) => {
    res.send('API is running...');  // Test endpoint to check if server is running correctly
})

app.listen(port, async() =>{
    await connectDb
    console.log(`Server running on port ${port}`);
})