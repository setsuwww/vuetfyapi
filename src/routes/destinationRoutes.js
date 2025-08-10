import express from 'express';
import { getAllDestinations, getDestinationById, createDestination } from '../controllers/destinationsController.js';

const router = express.Router();

router.get('/', getAllDestinations);
router.get('/:id', getDestinationById);
router.post('/', createDestination);

export default router;
