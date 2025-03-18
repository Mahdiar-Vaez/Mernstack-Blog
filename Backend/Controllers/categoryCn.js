import asyncHandler from "express-async-handler";
import ApiFeatures from "../Utils/apiFeatures.js";
import Category from "../Models/categoryMd.js";
import HandleERROR from "../Utils/handleError.js";
import Post from "../Models/postMd.js";
export const create=asyncHandler(async(req,res,next)=>{
  const {title=null,icon=null}=req.body
  if(!title || !icon){
    return next(new HandleERROR("عنوان و آیکون اجباریه",400))
  }
   const category=await Category.create({title,icon})
  res.status(200).json({
    success:true,
    message:"دسته بندی ها با موفقیت ایجاد شد",
    data:category
  })

})


export const getAll=asyncHandler(async(req,res,next)=>{
  const features=new ApiFeatures(Category,req.query).filter().limitFields().paginate().sort().populate()
  if(!features){
    return (new HandleERROR('مشکل در به دست آوردن اطلاعات پیش اومده',400))
  }
  const categories=await features.query
  res.status(200).json({
    success:true,
    message:"دسته بندی ها با موفقیت دریافت شد",
    data:categories
  })

})

export const getOne=asyncHandler(async(req,res,next)=>{
  const {id}=req?.params
  const category=await Category.findById(id)
  if(!category){
    return (new HandleERROR('مشکل در به دست آوردن اطلاعات پیش اومده',400))
  }

  res.status(200).json({
    success:true,
    message:"دسته بندی  با موفقیت دریافت شد",
    data:category
  })

})
export const update=asyncHandler(async(req,res,next)=>{
  const {id}=req?.params

  const category=await Category.findByIdAndUpdate(id,req.body,{
    new:true,
    runValidators:true
  })
  if(!category){
    return (new HandleERROR('مشکل در به دست آوردن اطلاعات پیش اومده',400))
  }

  res.status(200).json({
    success:true,
    message:"دسته بندی  با موفقیت دریافت شد",
    data:category
  })

})
export const remove=asyncHandler(async(req,res,next)=>{
  const {id}=req?.params

  await Category.findByIdAndDelete(id)
  await Post.deleteMany({categoryId:id})
 

  res.status(200).json({
    success:true,
    message:"دسته بندی  با موفقیت حذف شد",
  })

})


