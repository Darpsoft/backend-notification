import {Router} from 'express';
import {notification} from '../controllers/messaging.controller';

const router = Router();

router.route('/notification').post(notification);

export default router;
