import Tour from '../model/Tour.js'
import Review from '../model/Reviews.js'

export const createReview = async (req, res, next) =>{
    const tourId = req.params.tourId
    const newReview = new Review({...req.body})
    try{
        const saveReview = await newReview.save()
        await Tour.findByIdAndUpdate(tourId,{
            $push:{reviews:saveReview._id}
        })
        res.status(200).json({success:true,message:'Review saved successfully',data:saveReview})
    }catch(err){
        res.status(500).json({success:false,message:'failed to submit'})
    }
}


