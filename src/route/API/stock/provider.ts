import { Router } from 'express';

import { testAuth } from '../../../controller/midd';
import { listProvider, setProvider, upProvider, delProvider, searchProvider, listAdressProvider, delAdressProvider, setAdressProvider, upAdressProvider } from '../../../controller/provider';

const route = Router();

route.get('/list', testAuth, listProvider);

route.get('/search/:q', testAuth, searchProvider);

route.post('/', testAuth, setProvider);

route.put('/', testAuth, upProvider);

route.delete('/:providerId', testAuth, delProvider);

//Adress

route.get('/adress/list', testAuth, listAdressProvider);

route.delete('/adress/:providerId/:adressId', testAuth, delAdressProvider);

route.post('/adress/:providerId', testAuth, setAdressProvider);

route.put('/adress', testAuth, upAdressProvider);

export { route as provider };