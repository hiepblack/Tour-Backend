import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import cookieParser from 'cookie-parser';

import tourRoute from './router/tours.js'
import usersrouter from './router/users.js'
import authrouter from './router/auth.js'
import routerReview from './router/review.js'
import routerBooking from './router/bookings.js'

dotenv.config();
const app = express();
const port = process.env.PORT ||8000;
const corsOptions = {
        origin:true,
        credentials:true
}
// for test ting

app.get('/',(req, res) => {
    res.send("api working");
})
// database connect
mongoose.set('strictQuery',false)
const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log('mongodb connect successful');
    }catch(err) {
        console.log(err)
    }
}

// middleware
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

app.use('/api/v1/auth',authrouter)
app.use('/api/v1/tours',tourRoute)
app.use('/api/v1/users',usersrouter)
app.use('/api/v1/review',routerReview)
app.use('/api/v1/booking',routerBooking)

app.listen(port,()=>{
    connect();
    console.log('server listening on port',port);
})