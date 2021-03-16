import { Router } from 'express';

import { testAuth } from '../../../controller/midd';
import { upItem, delItem, setItem, getItem } from '../../../controller/item';

const route = Router();

route.get('/:itemId', testAuth, getItem);

route.put('/', testAuth, upItem);

route.delete('/:itemId', testAuth, delItem);

route.post('/', testAuth, setItem);

export { route as dado };