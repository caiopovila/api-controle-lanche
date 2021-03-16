import { Router } from 'express';

import { testAuth } from '../../../controller/midd';
import { upFreight, delFreight, setFreight } from '../../../controller/freight';

const route = Router();

route.put('/', testAuth, upFreight);

route.delete('/:freightId', testAuth, delFreight);

route.post('/', testAuth, setFreight);

export { route as freight };