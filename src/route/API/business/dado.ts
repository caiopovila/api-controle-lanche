import { Router } from 'express';

import { upBusiness, getDadoBusiness, setBusiness } from '../../../controller/business';
import { testAuth } from '../../../controller/midd';

const route = Router();

route.get('/', testAuth, getDadoBusiness);

route.put('/', testAuth, upBusiness);

route.post('/', setBusiness);

export { route as dado };