import express = require('express');
import { UserController } from './controller/user.controller';
import { ItemController } from './controller/item.controller';
import { AuthUserController } from './controller/auth-user.controller';

export function getRouter() {
    const router = express.Router();

    const userController = new UserController();
    router.get('/user', userController.getAllUsers);
    router.get('/user/:id', userController.getUserById);
    router.post('/user', userController.createUser);
    router.put('/user/:id', async (req, res) => { // Route handler for updating user
        try {
            const { id } = req.params; // Extract user ID from request params
            const updatedFields = req.body; // Extract updated fields from request body
            await userController.updateUser(id, updatedFields); // Call the controller method
            res.status(200).json({ message: 'User updated successfully' });
        } catch (err) {
            console.error("Error updating user:", err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
    router.delete('/user/:id', userController.deleteUser);

    const itemController = new ItemController();
    router.get('/item', itemController.getAllItems);
    router.get('/item/:id', itemController.getItemById);
    router.post('/item', itemController.createItem);
    router.put('/item/:id', async (req, res) => { // Route handler for updating item
        try {
            const { id } = req.params; // Extract item ID from request params
            const updatedFields = req.body; // Extract updated fields from request body
            await itemController.updateItem(id, updatedFields); // Call the controller method
            res.status(200).json({ message: 'Item updated successfully' });
        } catch (err) {
            console.error("Error updating item:", err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
    router.delete('/item/:id', itemController.deleteItem);

    const authUserController = new AuthUserController();
    router.post('/signup', authUserController.create);
    router.post('/login', authUserController.login);
        
    return router;
}
