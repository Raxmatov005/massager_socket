import express from 'express';
import authRoutes from './routes/auth.routes.ts';
import dotenv from 'dotenv';
import messagesRoutes from './routes/messages.routes.ts';
import cors from 'cors';

const app = express();

app.use(cors({origin: '*'}))

dotenv.config();

app.use(express.static('uploads'));

app.use(express.json());
app.use('/api', authRoutes)
app.use('/api/messages', messagesRoutes)

export default app;