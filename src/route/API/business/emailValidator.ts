import { Router } from 'express';

import { emailValidator } from '../../../controller/emailVaidator';

const route = Router();

route.post('/', emailValidator);

export { route as emailValidator };