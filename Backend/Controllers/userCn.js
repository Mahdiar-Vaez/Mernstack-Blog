import User  from "../Models/userMd.js";
import asyncHandler from "express-async-handler";
import ApiFeatures from "../Utils/apiFeatures.js";
import HandleERROR from "../Utils/handleError.js";
import bcryptjs from "bcryptjs";
export const getAll =asyncHandler(async(req,res,next)=>{
    const features=new ApiFeatures(User,req.query).filter().paginate().sort().limitFields()
    const users=await features.query
    if(!users) return next(new ErrorResponse('No users found',404))
        const user= users.map((e)=>{
            return  {
                id:e._id,
                username:e.username,
                email:e.email,
                role:e.role,
                createdAt:e.createdAt,
                updatedAt:e.updatedAt,

            }
        })
    res.status(200).json({
        success:true,count:users.length,
        data:user
    
    })
})
export const getOne =asyncHandler(async(req,res,next)=>{
    const {id}=req?.params
    const user=await User.findById(id).select('-password -__v')
    if(!user){
        return next(new HandleERROR('کاربر پیدا نشد',404))
    }
    if(req.userId!=id && req.role!='admin'){
        
        return next(new HandleERROR('دسترسی رد شد',401))
    }
    res.status(200).json({
        success:true,
        data:user
    })
})
export const update = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { role = null, password = null, ...others } = req.body;
    const passRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);
  
    if (password) {
      if (!passRegex.test(password)) {
        return next(new HandleERROR(
          "رمز عبور باید شامل حداقل 8 کاراکتر باشد، یک حرف بزرگ، یک حرف کوچک، یک عدد باشد و حتی یک حرف انگلیسی است",
          400
        ));
      }
    }
  
    const user = await User.findById(id);
    if (!user) {
      return next(new HandleERROR('کاربر پیدا نشد', 404));
    }
  
    if (req.userId != id && req.role != 'admin') {
      return next(new HandleERROR('دسترسی رد شد', 401));
    }
  
    const updatedData = {
      ...others,
      ...(password && { password: bcryptjs.hashSync(password, 10) })
    };
  
    const newUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true
    }).select('-password -__v');
  
    res.status(200).json({
      success: true,
      data: newUser
    });
  });