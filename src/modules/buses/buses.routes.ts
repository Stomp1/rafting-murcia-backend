import { Router } from 'express';
import { getBuses, updateBuses } from './buses.controller';
import { authenticate } from '../../middlewares/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/', getBuses);
router.post('/', updateBuses);

export default router;
