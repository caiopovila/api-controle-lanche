import { Router } from 'express';

import { testAuth } from '../../../controller/midd';
import { upEmployee, setEmployee, delEmployee, listEmployee } from '../../../controller/employee';

const route = Router();

route.put('/', testAuth, upEmployee);

route.post('/', testAuth, setEmployee);

route.delete('/:employeeId', testAuth, delEmployee);

route.get('/', testAuth, listEmployee);

export { route as employee };