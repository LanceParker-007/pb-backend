import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";

//Register user
export const register = asyncHandler(async (req, res) => {
  const { username } = req.body;

  if (!username) {
    res.status(400);
    throw new Error("Please enter all required fields");
  }

  try {
    //Check is user already registered
    const userExists = await User.findOne({ username: username });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Username already taken",
      });
    }

    //Create a new user
    const user = await User.create({
      username,
      score: 0,
    });

    if (user) {
      await user.save();
      res.status(201).json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error creating user",
    });
  }
});

//Set score
export const setScore = asyncHandler(async (req, res) => {
  //Check if times up or not
  if (new Date().toDateString() !== "Sun Sep 10 2023") {
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
    highscore: user.score,
  });
});
