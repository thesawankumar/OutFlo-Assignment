import express from 'express';
import generateMessage from '../controllers/messageController';


const router = express.Router();

router.post('/personalized-message', generateMessage);

export default router;
