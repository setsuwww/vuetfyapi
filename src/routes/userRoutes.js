import express from 'express';
import { getAllUsers } from '../controllers/userController.js';
import { authenticateToken } from "../middlewares/authMiddleware.js"

const router = express.Router();

router.get('/', getAllUsers);

router.get("/me", authenticateToken, (req, res) => {
  res.json({ id: req.user.id, name: req.user.name, email: req.user.email })
})

export default router;
