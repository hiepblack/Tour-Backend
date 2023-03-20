
import express from 'express';
import {createReview} from '../controllers/reviewControllers.js'
import {verifyUser} from '../utils/verifyToken.js'

const routerReview = express.Router();

routerReview.post('/:tourId',verifyUser,createReview)

export default routerReview;