import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Welcome to Omni CLI' }));

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.get('/session', authMiddleware, SessionController.index);

export default routes;
