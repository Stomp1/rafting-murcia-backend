import { Router } from 'express';
import { getMonitors, createMonitor, updateMonitor, deleteMonitor } from './monitors.controller';
import { authenticate } from '../../middlewares/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/', getMonitors);
router.post('/', createMonitor);
router.put('/:id', updateMonitor);
router.delete('/:id', deleteMonitor);

export default router;
