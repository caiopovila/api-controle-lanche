import { Router } from 'express';

import { testAuth } from '../../../controller/midd';
import { upClient, delClient, setClient } from '../../../controller/client';

const route = Router();

route.put('/', testAuth, upClient);

route.delete('/:clientId', testAuth, delClient);

route.post('/', testAuth, setClient);

export { route as dado };