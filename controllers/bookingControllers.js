import Booking from '../model/Booking.js'

export const createBook = async (req, res, next) =>{
    const newBooking = new Booking(req.body)
    try{
        const saveBooking = await newBooking.save()
        res.status(200).json({success:true,message:'Your tour is booked',data:saveBooking})
    }catch(err){
        res.status(500).json({success:false,message:'server error'})
    }
}

// get single booking

export const getBooking = async (req, res, next) =>{
    const id = req.params.id
    try{
        const book = await Booking.findById(id)
        res.status(200).json({success:true,message:'successfully',data:book})
    }catch(err){
        res.status(404).json({success:false,message:'not found'})
    }
}
// get all book
export const getAllBooking = async (req, res, next) =>{
    try{
        const books = await Booking.find()
        res.status(200).json({success:true,message:'successfully',data:books})
    }catch(err){
        res.status(500).json({success:false,message:'server error'})
    }
}