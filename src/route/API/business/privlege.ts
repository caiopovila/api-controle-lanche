import { Router } from 'express';

import { getPrivilege } from '../../../controller/business';
import { testAuth } from '../../../controller/midd';

const route = Router();

route.get('/', testAuth, getPrivilege);

export { route as privilege };