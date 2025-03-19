import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import authRouter from './Routes/auth.js';
import categoryRouter from './Routes/category.js';
import commentRouter from './Routes/comment.js';
import postRouter from './Routes/post.js';
import userRouter from './Routes/user.js';
import cors from 'cors';
import uploadRouter from './Routes/Upload.js';
import catchError from './Utils/catchError.js';
import HandleERROR from './Utils/handleError.js';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Serve static files from the 'Public' directory
app.use('/Public', express.static(path.join(__dirname, 'Public')));

app.use('/api/auth', authRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/comments', commentRouter);
app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);
app.use('/api/upload', uploadRouter);

app.use('*', (req, res, next) => {
  return next(new HandleERROR('route not found', 404));
});

app.use(catchError);

export default app;