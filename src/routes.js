import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ToolController from './app/controllers/ToolController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Welcome to API VUTTR' }));

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.get('/tools', ToolController.index);
routes.delete('/tools/:id', ToolController.delete);

routes.use(authMiddleware);
routes.post('/tools', ToolController.store);
routes.get('/session', authMiddleware, SessionController.index);

export default routes;
