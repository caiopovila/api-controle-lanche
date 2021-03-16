import { Router } from 'express';

import { auth } from '../../../controller/auth';
import { testAuth } from '../../../controller/midd';

const route = Router();

route.post('/', auth);

route.get('/logout', testAuth, (req, res) => {
    req.session.destroy(() => {
        res.json({S: 'Ok'});
    });
});

export { route as auth };
