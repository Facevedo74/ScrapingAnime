import { Router } from 'express';
import { getAnime } from '../controller/scraper.controller';

const router = Router();
router.post('/getAnime', getAnime);

export default router;
