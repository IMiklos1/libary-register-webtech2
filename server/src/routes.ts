import express = require('express');
import { AuthUserController } from './controller/auth-user.controller';
import { deleteUser, insertUser, listUser, updateUser } from './controller/user.controller';
import { deleteItem, insertItem, listItem, updateItem } from './controller/item.controller';

export function getRouter() {
    const router = express.Router();

    router.get('/user', listUser);
    router.get('/user/:id', );
    router.post('/user', insertUser);
    router.put('/user', updateUser);
    router.delete('/user/:id', deleteUser);

    router.get('/item', listItem);
    router.get('/item/:id', );
    router.post('/item', insertItem);
    router.put('/item', updateItem);
    router.delete('/item/:id', deleteItem);

    const authUserController = new AuthUserController();
    router.post('/signup', authUserController.create);
    router.post('/login', authUserController.login);
        
    return router;
}
