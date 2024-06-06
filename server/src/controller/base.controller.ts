import { Response } from 'express'; // Assuming you're using Express.js for handling HTTP objects
import { MongoClient, ObjectId } from 'mongodb';
import { User } from '../entity/User';
import { Request } from 'express-jwt';

const uri = "mongodb+srv://admin:admin@libaryregister.pvoei77.mongodb.net/?retryWrites=true&w=majority&appName=LibaryRegister";
const client = new MongoClient(uri);
const databaseName: string = "LibaryRegister";

export class MongoService {
    constructor(private collection:string) { 
        this.collection = collection;
    }

    async insertOneCollection(object: any, res: Response): Promise<void> {
        try {
            const dbo = client.db(databaseName);
            console.log(object);
            const result = await dbo.collection(this.collection).insertOne(object);
            console.log('Inserted document:', result.insertedId);
            res.status(200).send('Document inserted successfully');
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error:', error.message);
            } else {
                console.error('Unknown error:', error);
            }
            res.status(500).send('Internal server error');
        }
    }

    async listCollection(req: Request, res: Response): Promise<void> {
        try {
            const dbo = client.db(databaseName);
            const collection = await dbo.collection(this.collection).find().toArray();
            res.status(200).json(collection);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error:', error.message);
            } else {
                console.error('Unknown error:', error);
            }
            res.status(500).send('Internal server error');
        }
    }

    async updateOneCollection(req:Request, res: Response): Promise<void> {
        try {
            const dbo = client.db(databaseName);

            const objectId = new ObjectId(req.body._id);
            delete req.body._id;
            const result = await dbo.collection(this.collection).updateOne({_id: objectId},{$set: req.body});
            console.log('Updated document:', result.modifiedCount);
            res.status(200).send('Document updated successfully');
        } catch (error) {
            if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
        res.status(500).send('Internal server error');
        }
    }

    async deleteOneCollection(object: any, res: Response): Promise<void> {
        try {
            const dbo = client.db(databaseName);
            const result = await dbo.collection(this.collection).deleteOne(object);
            console.log('Deleted document:', result.deletedCount);
            res.status(200).send('Document deleted successfully');
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error:', error.message);
            } else {
                console.error('Unknown error:', error);
            }
            res.status(500).send('Internal server error');
        }
    }
}
