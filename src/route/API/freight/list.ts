import { Router } from 'express';

import { testAuth } from '../../../controller/midd';
import { listFreight, searchFreight } from '../../../controller/freight';

const route = Router();

route.get('/', testAuth, listFreight);

route.get('/search/:q', testAuth, searchFreight);

export { route as list };