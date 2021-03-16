import { Router } from 'express';

import { testAuth } from '../../../controller/midd';
import { setItemSale, delItem } from '../../../controller/sale';

let route = Router();

route.post('/:saleId', testAuth, setItemSale);

route.delete('/:saleId/:itemId', testAuth, delItem);

export { route as items };