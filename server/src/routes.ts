import express = require('express');
import { AuthUserController } from './controller/auth-user.controller';
import { createUser, deleteUser, insertUser, listUser, updateUser } from './controller/user.controller';
import { deleteitem, insertitem, listitem, updateitem } from './controller/item.controller';

export function getRouter() {
    const router = express.Router();

    router.get('/user', listUser);
    router.get('/user/:id', );
    router.post('/user', insertUser);
    router.put('/user/:id', updateUser);
    router.delete('/user/:id', deleteUser);

    router.get('/item', listitem);
    router.get('/item/:id', );
    router.post('/item', insertitem);
    router.put('/item/:id', updateitem);
    router.delete('/item/:id', deleteitem);

    const authUserController = new AuthUserController();
    router.post('/signup', authUserController.create);
    router.post('/login', authUserController.login);
        
    return router;
}
