import { Router } from 'express';

import { testAuth } from '../../../controller/midd';
import { listItem, searchItem } from '../../../controller/item';

const route = Router();

route.get('/', testAuth, listItem);

route.get('/search/:q', testAuth, searchItem);

export { route as list };