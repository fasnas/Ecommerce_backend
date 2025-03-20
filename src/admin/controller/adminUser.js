import mongoose from "mongoose";
import usermodel from "../../user/models/usermodel.js";

//get all users
export const getAllUsers = async (req, res) => {
  const users = await usermodel.find();

  if (!users)
    return res
      .status(404)
      .json({ succes: false, message: "user fetrching failed" });

  return res
    .status(200)
    .json({ succes: true, message: "user fetching succes", data: users });
};

//view a specific user

export const viewaSpecificUser = async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(404).json({ succes: false, message: "user invalid" });

  const specificUser = await usermodel.findById(userId);
  if (!specificUser)
    return res.status(404).json({ success: false, message: ` user not found` });

  return res.status(200).json({
    succes: true,
    message: "user fetched succes",
    data: specificUser,
  });
};

//remove user

export const removeSingleUser = async (req, res) => {
  const userId = req.params.id;
  if (mongoose.Types.ObjectId.isValid(userId))
    return res.status(404).json({ succes: false, message: "user invalid" });
  const removeUser = await usermodel.findByIdAndDelete(userId);
  if (!removeUser)
    return res.status(404).json({ succes: false, message: "user not found" });

  return res
    .status(200)
    .json({ succes: true, message: "user removed success", data: removeUser });
};

//block and unblock user

export const blockAndUnblockUser = async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(400).json({ success: false, message: "Invalid user ID" });

  const user = await usermodel.findById(userId);
  if (!user)
    return res.status(404).json({ succes: false, message: "user not found" });

  user.isBlocked = !user.isBlocked;
  await user.save();
  const action = user.isBlocked ? "Blocked" : "Unblocked";
  return res
    .status(200)
    .json({ succes: true, message: `user ${action}`, data: user });
};
