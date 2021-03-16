import { Router } from 'express';

import { testAuth } from '../../../controller/midd';
import { listProduct, setProduct, upProduct, delProduct, searchProduct, movStock } from '../../../controller/product';

const route = Router();

route.get('/list', testAuth, listProduct);

route.get('/search/:q', testAuth, searchProduct);

route.post('/', testAuth, setProduct);

route.put('/', testAuth, upProduct);

route.delete('/:productId', testAuth, delProduct);

route.put('/muv/:stockId', testAuth, movStock);

export { route as product };