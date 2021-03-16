import { Router } from 'express';

import { testAuth } from '../../../controller/midd';
import { listClient, searchClient } from '../../../controller/client';

const route = Router();

route.get('/client', testAuth, listClient);

route.get('/search/:q', testAuth, searchClient);

export { route as list };