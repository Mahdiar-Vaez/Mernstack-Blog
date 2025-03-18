import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import HandleERROR from "../Utils/handleError.js";
import User  from "../Models/userMd.js";
import jwt from "jsonwebtoken";
export const login = asyncHandler(async (req, res, next) => {
  try {
    const { username = null, password = null } = req.body;
    if (!username || !password) {
      return next(new HandleERROR("نام کاربری و رمز عبور اجاباری است", 400));
    }
    const user = await User.findOne({username});
    if (!user) {
      return next(new HandleERROR(" نام کاربری یا رمز عبور اشتباه است  ", 400));
    }
    const checkPass = bcryptjs.compareSync(password, user.password);
    if (!checkPass) {
      return next(new HandleERROR("رمز عبور اشتباه است", 400));
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY
    );
    res.status(200).json({
      success: "true",
      message: "ورود موفقیت آمیز بود",

      data: {
        token,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    next(new HandleERROR("خطا در ورود", 500));
  }
});
export const register = asyncHandler(async (req, res, next) => {
  const {
    password = null,
    username = null,
    email = null,
    ...others
  } = req.body;
 if(!password || !username){
  return next(new HandleERROR('نام کاربری و رمز عبور اجباری است',400))
 }
  const passRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);
  if (!passRegex.test(password)) {
   return next(new HandleERROR(
     "رمز عبور باید شامل حداقل 8 کاراکتری با��د، یک حرف بزرگ، یک حرف کو��ک، یک عدد با��د و حتی یک حرف انگلیسی ا��ت",
       400
    ));
  
  }
  
  
  const hashPass = bcryptjs.hashSync(password, 10);
  if(email){
    const IsEmailExist=await User.findOne({email})
    if(IsEmailExist){
      return next(new HandleERROR("ایمیل وارد شده قبلا استفاده شده است", 400))
  }
  
}
  const userData = { username, password: hashPass,email,others};


  await User.create(userData);

  const user = await User.findOne({ username });
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.SECRET_KEY
  );

  res.status(201).json({
    success: "true",
    message: "ثبت نام موفقیت آمیز بود",
    data: {
      token,
      id:user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});
