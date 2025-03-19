import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "عنوان پست اجباری است"],
    unique: [true, "عنوان پست قبلاً گرفته شده است"],
  },
  images: [{
    type: String
  }],
  description: {
    type: String,
    required: [true, "توضیحات اجباری است"],
  },
  text: {
    type: String,
   
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
}, {
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);
export default Post;