import asyncHandler from "express-async-handler";
import HandleError from "../Utils/handleError.js";
import fs from "fs";
import path from "path";
import { __dirname } from "../app.js";

export const uploadCn = asyncHandler(async (req, res, next) => {
  try {
    const file = req.file;
  if (!file) {
    return next(new HandleError("UPLOAD failed", 400));
  }
  return res.status(201).json({
    success: true,
    file: file,
  });
  } catch (error) {
    console.log(error)
  }
  
});

export const deleteFile = asyncHandler(async (req, res, next) => {
  const { fileName } = req.body;
  const deleteFileName = fileName.split("/").at(-1);

  if (deleteFileName == "*") {
    return next(new HandleError("File not found", 400));
  }
  if (!fileName) {
    return next(new HandleError("File not found", 400));
  }
  fs.unlinkSync(path.join(__dirname, 'Public', deleteFileName));

  return res.status(200).json({
    success: true,
    message: "File removed",
  });
});