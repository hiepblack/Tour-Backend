import User from "../model/User.js";

// create new User

export const createUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const saveUser = await newUser.save();
    res.status(200).json({ success: true, message: "created", data: saveUser });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed wrong" });
  }
};
// update User
export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "updated", data: updateUser });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed update" });
  }
};
// delete User
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed delete" });
  }
};
// get User
export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json({ success: true, message: "deleted", data: user });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};
// getAll User
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).json({
      success: true,
      message: "successfully",
      data: users,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};