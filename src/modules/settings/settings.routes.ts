import { Router } from 'express';
import { getSettings, updateSettings } from './settings.controller';
import { authenticate } from '../../middlewares/authMiddleware';

const router = Router();

// Protect all settings routes
router.use(authenticate);

router.get('/', getSettings);
router.put('/', updateSettings);

export default router;
