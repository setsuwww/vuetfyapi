import express from 'express'
import { createComment, getCommentsByDestination } from '../controllers/commentController.js'

const router = express.Router()

// POST komentar
router.post('/destinations/:destinationId/comments', createComment)
router.get('/destinations/:destinationId/comments', getCommentsByDestination)

export default router
