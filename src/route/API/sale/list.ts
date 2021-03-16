import { Router } from 'express';

import { testAuth } from '../../../controller/midd';
import { listSale, listItemsSale, listSalePending } from '../../../controller/sale';

let route = Router();

route.get('/', testAuth, listSale);

route.get('/pending', testAuth, listSalePending);

route.get('/items/:saleId', testAuth, listItemsSale);

export { route as list };