import express from "express";
import {
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUser,
} from "../controllers/userController.js";
import {verifyUser,verifyAdmin} from '../utils/verifyToken.js'

const usersrouter = express.Router();

// update  user
usersrouter.put("/:id", verifyUser,updateUser);
// delete  user
usersrouter.delete("/:id", verifyUser,deleteUser);
// get one user
usersrouter.get("/:id",verifyUser,getSingleUser);
// getall  user
usersrouter.get("/",verifyAdmin ,getAllUser);

export default usersrouter;
