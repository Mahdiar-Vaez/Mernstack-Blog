import jwt from "jsonwebtoken";
export const isAdmin = (req, res, next) => {
  try {
    const { id, role } = jwt.verify(
      req?.headers?.authorization.split(" ")[1],
      process.env.SECRET_KEY
    );
    console.log(id,role)
    req.userId = id;
    req.role = role;
    if(role!='admin'){
        return res.status(401).json({
            message: "دسترسی رد شد",
            success: false,
          });
    }
    return next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      message: "خطا در دسترسی",
      success: false,
    });
  }
};
