import { Router } from 'express';

import { auth } from './auth';
import { privilege } from './privlege';
import { adress } from './adress';
import { dado } from './dado';
import { cost } from './cost';
import { employee } from './employee';
import { emailValidator } from './emailValidator';
import { notification } from './notification';

const route = Router();

route.use('/auth', auth);
route.use('/privilege', privilege);
route.use('/adress', adress);
route.use('/dado', dado);
route.use('/emailvalidator', emailValidator);
route.use('/cost', cost);
route.use('/employee', employee);
route.use('/notification', notification);

export { route as business };