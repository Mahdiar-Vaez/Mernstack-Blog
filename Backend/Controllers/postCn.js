import ApiFeatures from "../Utils/apiFeatures.js";
import HandleError from "../Utils/handleError.js";
import Post from "../Models/postMd.js";
import Comment from "../Models/commentMd.js";
import asyncHandler from "express-async-handler";
export const getAll = asyncHandler(async (req, res, next) => {
  const features = new ApiFeatures(Post, req?.query)
    .filter()
    .paginate()
    .sort()
    .populate()
    .limitFields()
    .secondPopulate("categoryId");
  const posts = await features.query;
  const count = await Post.countDocuments(req?.query?.filters);
  return res.status(200).json({
    success: true,
    data: posts,
    count,
    message: "پست‌ها با موفقیت دریافت شدند",
  });
});

export const create = asyncHandler(async (req, res, next) => {
  const post = await Post.create(req.body);
  return res.status(200).json({
    success: true,
    data: post,
    message: "پست با موفقیت ایجاد شد",
  });
});

export const getOne = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("categoryId");
  return res.status(200).json({
    success: true,
    data: post,
    message: "پست با موفقیت دریافت شد",
  });
});

export const update = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success: true,
    data: post,
    message: "پست با موفقیت به‌روزرسانی شد",
  });
});

export const remove = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);
  await Comment.deleteMany({ postId: id });
  return res.status(200).json({
    success: true,
    message: "پست با موفقیت حذف شد",
  });
});