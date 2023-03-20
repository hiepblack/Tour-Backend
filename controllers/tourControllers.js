import Tour from "../model/Tour.js";

// create new tour

export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);
  try {
    const saveTour = await newTour.save();
    res.status(200).json({ success: true, message: "created", data: saveTour });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed wrong" });
  }
};
// update tour
export const updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updateTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "updated", data: updateTour });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed update" });
  }
};
// delete tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed delete" });
  }
};
// get tour
export const getSingleTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findById(id).populate('reviews');
    res.status(200).json({ success: true, message: "deleted", data: tour });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};
// getAll tour
export const getAllTour = async (req, res) => {
  const page = parseInt(req.query.page);
  try {
    const tours = await Tour.find({}).populate('reviews')
      .skip(page * 8)
      .limit(8);
    res.status(200).json({
      success: true,
      count: tours.length,
      message: "successfully",
      data: tours,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};
// get tour by search
export const getTourBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);
  console.log(maxGroupSize);
  try {
    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate('reviews');
    res
      .status(200)
      .json({ success: true, message: "successfully", data: tours });
  } catch (err) {
    res.status(404).json({ success: false, message: err });
  }
};

// get feature
export const getFeatureTour = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true }).populate('reviews').limit(8);
    res.status(200).json({
      success: true,
      message: "successfully",
      data:tours,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};
// get tour count
export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res
      .status(200)
      .json({ success: true, message: "successfull", data: tourCount });
  } catch (err) {
    res.status(500).json({ success: false, message: "Not found" });
  }
};
