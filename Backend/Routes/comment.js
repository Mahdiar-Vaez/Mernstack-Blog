import express from 'express'
import { changeActivity, create, getAll, getPostComments } from '../Controllers/commentCn.js'
import { isAdmin } from '../Middlewares/isAdmin.js'
import { isLogin } from '../Middlewares/isLogin.js'

const commentRouter=express.Router()
commentRouter.route('/').get(getAll).post(isLogin,create)
commentRouter.route('/:id').get(getPostComments).delete(isAdmin,create).patch(isAdmin,changeActivity)




export default commentRouter