import { Router } from 'express';

import { list } from './list';
import { freight } from './dado';

const route = Router();

route.use('/list', list);
route.use('/dado', freight);

export { route as freight };