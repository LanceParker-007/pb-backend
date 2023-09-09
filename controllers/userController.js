import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";

//Register user
export const register = asyncHandler(async (req, res) => {
  const { name, email, mobilenumber } = req.body;

  if (!name || !mobilenumber) {
    res.status(400);
    throw new Error("Please enter all required fields");
  }

  try {
    //Check is user already registered
    const userExists = await User.findOne({ mobilenumber });
    if (userExists) {
      res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    //Create a new user
    const user = new User({
      name,
      email: email ? email : null,
      mobilenumber,
    });

    if (user) {
      user.save();

      res.status(201).json({
        _id: user._id,
        name: user.name,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating user",
    });
  }
});

//Set score
export const setScore = asyncHandler(async (req, res) => {
  //Check if times up or not
  if (new Date().toDateString() !== "Tue Sep 10 2023") {
    return res.status(200).json({
      success: true,
      message: `Times Up`,
    });
  }

  const { currentScore } = req.body;

  const user = await User.findOne({ _id: req.user._id });

  try {
    if (!user.score) {
      user.score = currentScore;
      await user.save();

      return res.status(200).json({
        success: true,
        message: `Your score is ${currentScore}`,
      });
    } else if (Number(currentScore) > Number(user.score)) {
      user.score = currentScore;
      await user.save();

      return res.status(200).json({
        success: true,
        message: `Yay! Your New High Score ${currentScore}`,
      });
    }

    // No new High score
    return res.status(200).json({
      success: true,
      message: `Your score is ${currentScore}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while saving score",
    });
  }
});

export const getScore = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });

  return res.status(200).json({
    success: true,
    score: user.score ? user.score : 0,
  });
});
