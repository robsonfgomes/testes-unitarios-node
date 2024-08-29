import { Router } from 'express';
import { HomeController } from './endpoints/home/HomeController';
import { UserController } from './endpoints/users/UserController';

const router = Router();
const homeControler = new HomeController();
const userController = new UserController();

// Home
router.get('/', homeControler.get);

// Users
router.get('/users', userController.list);
router.get('/users/:id', userController.getOne);
router.post('/users', userController.create);
router.delete('/users/:id', userController.delete);

export { router };
