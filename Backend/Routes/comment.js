import express from 'express'
import { changeActivity, create, getAll, getPostComments, remove } from '../Controllers/commentCn.js'
import { isAdmin } from '../Middlewares/isAdmin.js'
import { isLogin } from '../Middlewares/isLogin.js'

const commentRouter=express.Router()
commentRouter.route('/').get(getAll).post(isLogin,create)
commentRouter.route('/:id').get(getPostComments).delete(isAdmin,remove).patch(isAdmin,changeActivity)




export default commentRouter