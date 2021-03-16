import { Router } from 'express';

import { provider } from './provider';
import { product } from './product';

const route = Router();

route.use('/provider', provider);
route.use('/product', product);

export { route as stock };