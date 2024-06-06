import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { Item } from '../entity/Item';
import { MongoService } from './base.controller';

const mongoService = new MongoService("item");

export async function insertItem(req: Request, res: Response): Promise<void> {
    try {
        delete req.body._id;
        const { number, type, author, title, procurementDate, status = 'free', renterId = '', startRent = ''} = req.body;
        const item = {
            number, type, author, title, procurementDate, status : 'free', renterId : '', startRent : ''
        }
        await mongoService.insertOneCollection(item, res);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
        res.status(500).send('Internal server error');
    }
}

export async function listItem(req: Request, res: Response): Promise<void> {
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

export async function updateItem(req: Request, res: Response): Promise<void> {
    try {
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

export async function deleteItem(req: Request, res: Response): Promise<void> {
    try {
        delete req.body._id;
        const { number, type, author, title, procurementDate, status = 'free', renterId = '', startRent = ''} = req.body;
        const item = {
            number, type, author, title, procurementDate, status : 'free', renterId : '', startRent : ''
        }
        await mongoService.deleteOneCollection(item, res);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
        res.status(500).send('Internal server error');
    }
}
