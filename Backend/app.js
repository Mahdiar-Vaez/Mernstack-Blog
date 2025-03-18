import express from "express";
import morgan from "morgan";
import path, { dirname } from "path";
import {fileURLToPath} from 'url'
import authRouter from "./Routes/auth.js";
import catchError from "./Utils/catchError.js";
import HandleERROR from "./Utils/handleError.js";
import userRouter from "./Routes/user.js";
import categoryRouter from "./Routes/category.js";
export  const app =express()
app.use(express.json())

const __filename=fileURLToPath(import.meta.url)
export const __dirname=path.dirname(__filename)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static('Public'))
app.use('/api/users',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/categories',categoryRouter)








app.use('*',(req,res,next)=>{
    next(new HandleERROR('route not found',404) )
})
app.use(catchError)
export default app