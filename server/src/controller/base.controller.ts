import { Response } from 'express'; // Assuming you're using Express.js for handling HTTP objects
import { MongoClient } from 'mongodb';
import { User } from '../entity/User';
import { Request } from 'express-jwt';

const uri = "mongodb+srv://admin:admin@libaryregister.pvoei77.mongodb.net/";
const client = new MongoClient(uri);
const databaseName: string = "LibaryRegister";

export class MongoService {
    constructor(private collection:string) { 
        this.collection = collection
    }

    async createCollection(object: any, res: Response): Promise<void> {
        try {
            await client.connect();
            const dbo = client.db(databaseName);
            await dbo.createCollection(this.collection);
            console.log(`Collection ${this.collection} created!`);
            res.status(200).send('Collection created successfully');
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).send('Error creating collection');
        } finally {
            await client.close();
        }
    }

    async insertOneCollection(object: any, res: Response): Promise<void> {
        try {
            await client.connect();
            const dbo = client.db(databaseName);
            console.log(object);
            const result = await dbo.collection(this.collection).insertOne(object);
            console.log('Inserted document:', result.insertedId);
            res.status(200).send('Document inserted successfully');
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).send('Error inserting document');
        } finally {
            await client.close();
        }
    }

    async listCollection(req: Request, res: Response): Promise<void> {
        try {
            await client.connect();
            const dbo = client.db(databaseName);
            const collection = await dbo.collection(this.collection).find().toArray();
            res.status(200).json(collection);
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).send('Error listing collection');
        } finally {
            await client.close();
        }
    }

    async updateOneCollection(object: any, res: Response): Promise<void> {
        try {
            await client.connect();
            const dbo = client.db(databaseName);
            const result = await dbo.collection(this.collection).updateOne({id: object.id},{$set: object});
            console.log('Updated document:', result.modifiedCount);
            res.status(200).send('Document updated successfully');
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).send('Error updating document');
        } finally {
            await client.close();
        }
    }

    async deleteOneCollection(object: any, res: Response): Promise<void> {
        try {
            await client.connect();
            const dbo = client.db(databaseName);
            const result = await dbo.collection(this.collection).deleteOne(object);
            console.log('Deleted document:', result.deletedCount);
            res.status(200).send('Document deleted successfully');
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).send('Error deleting document');
        } finally {
            await client.close();
        }
    }

    async deleteCollection(res: Response): Promise<void> {
        try {
            await client.connect();
            const dbo = client.db(databaseName);
            await dbo.collection(this.collection).drop();
            console.log(`Collection ${this.collection} dropped!`);
            res.status(200).send('Collection deleted successfully');
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).send('Error deleting collection');
        } finally {
            await client.close();
        }
    }
}
