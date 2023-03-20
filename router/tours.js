import express from 'express';
import { createTour, updateTour,deleteTour, getSingleTour, getAllTour,getTourBySearch,getFeatureTour,getTourCount } from '../controllers/tourControllers.js';
import {verifyAdmin} from '../utils/verifyToken.js'

const tourRoute = express.Router();
// create new tour 
tourRoute.post('/',verifyAdmin, createTour)
// update  tour 
tourRoute.put('/:id', verifyAdmin,updateTour)
// delete  tour 
tourRoute.delete('/:id', verifyAdmin,deleteTour)

// getone  tour 
tourRoute.get('/:id', getSingleTour)
// getall  tour 
tourRoute.get('/', getAllTour)
// search
tourRoute.get('/search/getTourBySearch', getTourBySearch)
// feature
tourRoute.get('/search/getFeatureTour', getFeatureTour)
// count tour
tourRoute.get('/search/getTourCount', getTourCount)

export default tourRoute;