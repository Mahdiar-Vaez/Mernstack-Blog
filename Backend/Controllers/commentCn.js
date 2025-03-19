import asyncHandler from "express-async-handler";
import Comment from "../Models/commentMd.js";
import ApiFeatures from "../Utils/apiFeatures.js";

export const getAll = asyncHandler(async (req, res, next) => {
  const features = new ApiFeatures(Comment, req?.query)
    .filter()
    .paginate()
    .sort()
    .populate()
    .limitFields()
    .secondPopulate({ path: "userId", select: "username" });
  const comments = await features.query;
  const count = await Comment.countDocuments(req?.query?.filters);
  return res.status(200).json({
    success: true,
    data: comments,
    count,
    message: "نظرات با موفقیت دریافت شدند",
  });
});

export const getPostComments = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const comments = await Comment.find({
    $and: [{ postId: id }, { isActive: true }],
  });
  return res.status(200).json({
    success: true,
    data: comments,
    message: "نظرات پست با موفقیت دریافت شدند",
  });
});

export const create = asyncHandler(async (req, res, next) => {
  const comment = await Comment.create({
    content: req.body.content,
    postId: req.body.postId,
    userId: req.userId,
  });
  return res.status(200).json({
    success: true,
    data: comment,
    message: "نظر با موفقیت ایجاد شد",
  });
});

export const changeActivity = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const comment = await Comment.findById(id);
  comment.isActive = !comment.isActive;
  const newComment = await comment.save();
  return res.status(200).json({
    success: true,
    data: newComment,
    message: "وضعیت نظر با موفقیت تغییر کرد",
  });
});

export const remove = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await Comment.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: "نظر با موفقیت حذف شد",
  });
});