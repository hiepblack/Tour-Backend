import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    // hashing pass
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = await User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
    });
    await newUser.save();
    res.status(200).json({ success: true, message: "creted Successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "creted failed" });
  }
};
// user login
export const login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
    }
    const checkCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!checkCorrect) {
      res
        .status(402)
        .json({ success: false, message: "Incorrect email or password" });
    }
    const { password, role, ...rest } = user._doc;
    // crete jwt
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );
    // set token in browser and send to client
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({ token, data: { ...rest }, role });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};
