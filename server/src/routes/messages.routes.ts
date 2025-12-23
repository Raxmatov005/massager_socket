import express from 'express';
import { getMessages, getUsers, newMessage } from '../controllers/messages.controller.ts';
import { routeProtect } from '../middleware/routeProtect.ts';

const router = express.Router();


router.get('/users',routeProtect, getUsers)
router.post('/send/:id', routeProtect, newMessage)
router.post('/:id', routeProtect, getMessages)


export default router;