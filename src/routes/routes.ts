import { Router } from 'express';
import * as controller from '../controllers/controller';

export const router: Router = Router();

router.post('/getPets', controller.getPets);
router.post('/getPetInfo', controller.getPetInfo);
