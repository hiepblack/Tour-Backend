
import express from 'express';
import {createBook,getBooking,getAllBooking} from '../controllers/bookingControllers.js'
import {verifyUser,verifyAdmin} from '../utils/verifyToken.js'

const routerBooking = express.Router();

routerBooking.post('/',verifyUser,createBook)
routerBooking.get('/:id',verifyUser,getBooking)
routerBooking.get('/',verifyAdmin,getAllBooking)

export default routerBooking;