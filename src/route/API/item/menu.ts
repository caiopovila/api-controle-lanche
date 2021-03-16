import { Router } from 'express';

import { testAuth } from '../../../controller/midd';
import { delItemMenu, setItemsMenu } from '../../../controller/item';

const route = Router();

route.delete('/:itemId/:menuId', testAuth, delItemMenu);

route.post('/:menuId', testAuth, setItemsMenu);

export { route as menu };