import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { User } from '../entity/User';
import { MongoService } from './base.controller';

const mongoService = new MongoService("user");

export async function insertUser(req: Request, res: Response): Promise<void> {
    try {
        delete req.body._id;
        const { id, name, address, phone, idCard, status } = req.body;
        const user = {
           id, name, address, phone, idCard, status
        };
        await mongoService.insertOneCollection(user, res);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
        res.status(500).send('Internal server error');
    }
}

export async function listUser(req: Request, res: Response): Promise<void> {
    try {
        await mongoService.listCollection(req, res);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
        res.status(500).send('Internal server error');
    }
}

export async function updateUser(req: Request, res: Response): Promise<void> {
    try {
        const id = req.body._id;
        delete req.body._id;
        console.log(req.body);
        const { name, address, phone, idCard, status } = req.body;
        const user = {
           id, name, address, phone, idCard, status
        };
        await mongoService.updateOneCollection(req, res);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
        res.status(500).send('Internal server error');
    }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
    try {
        const { id, name, address, phone, idCard, status } = req.body;
        const user = {
           id, name, address, phone, idCard, status
        };
        await mongoService.deleteOneCollection(user, res);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
        res.status(500).send('Internal server error');
    }
}
