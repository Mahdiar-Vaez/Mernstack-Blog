import { json } from "express";
import jwt from "jsonwebtoken";

export const isLogin = (req, res, next) => {
  try {
    const { id, role } = jwt.verify(
      req?.headers?.authorization.split(" ")[1],
      process.env.SECRET_KEY
    );
    console.log(id,role)
    
    req.userId = id;
    req.role = role;
    return next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      message: "باید ابتدا ثبت نام یا ورود کنید",
      success: false,
    });
  }
};
