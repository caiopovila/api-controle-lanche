import { Router } from 'express';

import { list } from './list';
import { items } from './items';
import { dado } from './dado';

let route = Router();

route.use('/list', list);
route.use('/dado', dado);
route.use('/items', items);

export { route as sale };