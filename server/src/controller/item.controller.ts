import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { Item } from '../entity/Item';
const uri = "mongodb+srv://admin:admin@libaryregister.pvoei77.mongodb.net/?retryWrites=true&w=majority&appName=LibaryRegister";
const client = new MongoClient(uri);
const databaseName: string = "LibaryRegister";
const collectionName: string = "item";

export class ItemController {

    constructor() {
    }

    public async getAllItems(): Promise<Item[]> {
        try {
            await client.connect();
            const db = client.db(databaseName);
            const collection = db.collection(collectionName);
            const items = await collection.find({}).toArray();
            // Properly cast each document to Item type
            console.log(items.map(doc => ({
                id: doc.id,
                number: doc.number,
                type: doc.type,
                author: doc.author,
                title: doc.title,
                procurementDate: new Date(doc.procurementDate),
                status: doc.status,
                renterId: doc.renterId,
                startRent: new Date(doc.startRent)
            })));
            return items.map(doc => ({
                id: doc.id,
                number: doc.number,
                type: doc.type,
                author: doc.author,
                title: doc.title,
                procurementDate: new Date(doc.procurementDate),
                status: doc.status,
                renterId: doc.renterId,
                startRent: new Date(doc.startRent)
            }));
        } catch (err) {
            console.error("Error retrieving items:", err);
            throw err;
        } finally {
            await client.close();
        }
    }
    

    public async getItemById(id: string): Promise<Item | null> {
        try {
            await client.connect();
            const db = client.db(databaseName);
            const collection = db.collection(collectionName);
            const item = await collection.findOne({ _id: new ObjectId(id) });
    
            if (item) {
                // Properly cast the document to Item type
                return {
                    id: item.id,
                    number: item.number,
                    type: item.type,
                    author: item.author,
                    title: item.title,
                    procurementDate: new Date(item.procurementDate),
                    status: item.status,
                    renterId: item.renterId,
                    startRent: new Date(item.startRent)
                };
            } else {
                return null;
            }
        } catch (err) {
            console.error("Error retrieving item:", err);
            throw err;
        } finally {
            await client.close();
        }
    }
    

    public async createItem(item: any): Promise<void> {
        try {
            await client.connect();
            const db = client.db(databaseName);
            const collection = db.collection(collectionName);
            // Retrieve the maximum id value from the database
        const maxId = await collection.findOne({}, { sort: { id: -1 } });

        // Increment the maximum id value by one
        const newId = maxId ? maxId.id + 1 : 1;

        // Set the id element of the item.body to the new id
        item.body.id = newId;
            await collection.insertOne(item.body);
        } catch (err) {
            console.error("Error creating item:", err);
            throw err;
        } finally {
            await client.close();
        }
    }

    public async updateItem(id: string, updatedFields: Partial<Item>): Promise<void> {
        try {
            await client.connect();
            const db = client.db(databaseName);
            const collection = db.collection(collectionName);
            await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedFields });
        } catch (err) {
            console.error("Error updating item:", err);
            throw err;
        } finally {
            await client.close();
        }
    }

    public async deleteItem(id: string): Promise<void> {
        try {
            await client.connect();
            const db = client.db(databaseName);
            const collection = db.collection(collectionName);
            await collection.deleteOne({ _id: new ObjectId(id) });
        } catch (err) {
            console.error("Error deleting item:", err);
            throw err;
        } finally {
            await client.close();
        }
    }
}
