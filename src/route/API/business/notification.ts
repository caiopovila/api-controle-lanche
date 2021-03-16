import { Router } from 'express';

import { notification } from '../../../controller/notification';

const route = Router();

route.post('/', notification);

export { route as notification };
