import { Router } from 'express';

import { testAuth } from '../../../controller/midd';
import { upCost, setCost, delCost, listCost } from '../../../controller/cost';

const route = Router();

route.put('/', testAuth, upCost);

route.post('/', testAuth, setCost);

route.delete('/:cost', testAuth, delCost);

route.get('/', testAuth, listCost);

export { route as cost };