import { Router } from 'express';

import { list } from './list';
import { dado } from './dado';
import { adress } from './adress';

const route = Router();

route.use('/list', list);
route.use('/adress', adress);
route.use('/dado', dado);

export { route as client };