import express from 'express'
import { getAllReviews } from '../controllers/reviewsController.js'

const router = express.Router()

router.get('/', getAllReviews)

export default router
