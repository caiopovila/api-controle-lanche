import { Router } from 'express';

import { testAuth } from '../../../controller/midd';
import { upAdressClient, setAdressClient, delAdressClient, listAdressClient } from '../../../controller/client';

const route = Router();

route.put('/', testAuth, upAdressClient);

route.post('/:clientId', testAuth, setAdressClient);

route.get('/:clientId', testAuth, listAdressClient);

route.delete('/:clientId/:adressId', testAuth, delAdressClient);

export { route as adress };