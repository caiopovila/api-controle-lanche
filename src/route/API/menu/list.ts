import { Router } from 'express';

import { testAuth } from '../../../controller/midd';
import { listMenu, listItemsMenu, listItemsNotMenu } from '../../../controller/menu';

const route = Router();

route.get('/', testAuth, listMenu);

route.get('/items/:menuId', testAuth, listItemsMenu);

route.get('/items/not/:menuId', testAuth, listItemsNotMenu);

export { route as list };