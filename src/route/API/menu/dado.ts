import { Router } from 'express';

import { testAuth } from '../../../controller/midd';
import { upMenu, delMenu, setMenu } from '../../../controller/menu';

const route = Router();

route.put('/', testAuth, upMenu);

route.delete('/:menuId', testAuth, delMenu);

route.post('/', testAuth, setMenu);

export { route as dado };