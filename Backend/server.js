
import app,{__dirname} from './app.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({path:`${__dirname}/config.env`})
mongoose.connect(process.env.DATA_BASE).then(()=>{
    console.log('db is connected')
}).catch((err)=>{
    console.log(err)
})
app.listen(5005,()=>{
    console.log('server is running')

})