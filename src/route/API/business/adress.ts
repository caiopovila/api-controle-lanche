import { Router } from 'express';

import { testAuth } from '../../../controller/midd';
import { upAdressBusiness, setAdressBusiness, getAdressBusiness } from '../../../controller/business';

const route = Router();

route.get('/', testAuth, getAdressBusiness);

route.put('/', testAuth, upAdressBusiness);

route.post('/',  testAuth, setAdressBusiness);

export { route as adress };