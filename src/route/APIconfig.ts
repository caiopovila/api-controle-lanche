import { Router } from 'express';

import { index } from './API';
import { business } from './API/business';
import { client } from './API/client';
import { item } from './API/item';
import { menu } from './API/menu';
import { stock } from './API/stock';
import { sale } from './API/sale';
import { freight } from './API/freight';

const route = Router();

route.use('/', index);
route.use('/business', business);
route.use('/client', client);
route.use('/item', item);
route.use('/menu', menu);
route.use('/stock', stock);
route.use('/sale', sale);
route.use('/freight', freight);

export { route as api };