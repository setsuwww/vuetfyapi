import express from 'express';
import { getAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);             // GET /api/users

export default router;
