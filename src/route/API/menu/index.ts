import { Router } from 'express';

import { list } from './list';
import { dado } from './dado';

const route = Router();

route.use('/list', list);
route.use('/dado', dado);

export { route as menu };