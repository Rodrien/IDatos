import express from 'express';
import eventsController from '../controllers/eventsController.js';

const router = express.Router();

router.get('/', eventsController.get);
router.get('/:id', eventsController.getById);

router.post('/', eventsController.post);
router.post('/bulk', eventsController.postBulk);

export default router;