import { Router } from 'express';

import { testAuth } from '../../../controller/midd';
import { delProductItem, setProductItem } from '../../../controller/item';

const route = Router();

route.delete('/:itemId/:productId', testAuth, delProductItem);

route.post('/:itemId', testAuth, setProductItem);

export { route as prods };