import { Router } from 'express';
import { getCommercials, createCommercial, updateCommercial, deleteCommercial } from './commercials.controller';
import { authenticate } from '../../middlewares/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/', getCommercials);
router.post('/', createCommercial);
router.put('/:id', updateCommercial);
router.delete('/:id', deleteCommercial);

export default router;
