import mongoose  from "mongoose";
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,'نام کاربری اجباری میباشد'],
        unique:[true,'نام کاربری قبلا استفاده شده است ']
    },
    password:{
        type:String,
        required:[true,"رمز عبور اجباری میباشد"]
    },
    email:{
        type:String,
        match:[/^[\w.+\-]+@gmail\.com$/,"ایمیل شما نامعتبر میباشد"],
        default:null,
        
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }
},{timestamps:true})
 const User=mongoose.model('User',userSchema)
 export default User