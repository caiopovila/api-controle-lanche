import { Router } from 'express';

import { list } from './list';
import { dado } from './dado';
import { menu } from './menu';
import { prods } from './products';

const route = Router();

route.use('/list', list);
route.use('/dado', dado);
route.use('/products', prods);
route.use('/menu', menu);

export { route as item };