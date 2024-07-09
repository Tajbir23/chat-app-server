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
app.use(cors({
    origin: ['http://localhost:3000'], // Change this to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
// Connect to MongoDB

const connectDb = mongoose.connect('mongodb://localhost:27017/chat');
// const connectDb = mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.sdyx3bs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/chat`)
// .then(() => {
//     console.log('Connected to MongoDB');
// })
// .catch((err) => {
//     console.log('Error connecting to MongoDB:', err);
// })


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