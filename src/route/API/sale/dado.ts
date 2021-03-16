import { Router } from 'express';

import { testAuth } from '../../../controller/midd';
import { setSale, upSale, delSale } from '../../../controller/sale';

let route = Router();

route.post('/', testAuth, setSale);

route.put('/', testAuth, upSale);

route.delete('/:saleId', testAuth, delSale);

export { route as dado };
