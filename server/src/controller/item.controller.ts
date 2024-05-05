import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { Item } from '../entity/Item';
import { MongoService } from './base.controller';

const mongoService = new MongoService("item");

export async function createItem(req: Request, res: Response): Promise<void> {
    try {
        await mongoService.createCollection(req, res);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal server error');
    }
}

export async function insertItem(req: Request, res: Response): Promise<void> {
    try {
        const item: Item = req.body; // Assuming item data is in the request body
        await mongoService.insertOneCollection(req, res);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal server error');
    }
}

export async function listItem(req: Request, res: Response): Promise<void> {
    try {
        await mongoService.listCollection(req, res);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal server error');
    }
}

export async function updateItem(req: Request, res: Response): Promise<void> {
    try {
        const item: Item = req.body; // Assuming item data is in the request body
        await mongoService.updateOneCollection(req, res);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal server error');
    }
}

export async function deleteItem(req: Request, res: Response): Promise<void> {
    try {
        const itemId: string = req.params.itemId; // Assuming itemId is passed as a route parameter
        await mongoService.deleteOneCollection(req, res);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal server error');
    }
}
