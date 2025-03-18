import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "متن عنوان دسته بندی اجباریه"],
    unique: [true, "عنوان کتگوری با یونیک باشه"],
  },
  icon:{
    type:String
  }
},{
    timestamps:true
});
const Category=mongoose.model('Category',categorySchema)
export default Category
