const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express();

dotenv.config();

// Import routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')



// connect to db
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, ()=>console.log('connected to db!'))

// middlewares
app.use(express.json())





// Route middlewares
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

app.listen(3000, ()=>console.log('Server is up and running...'))