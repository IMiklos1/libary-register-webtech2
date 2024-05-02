import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { User } from '../entity/User';
const uri = "mongodb+srv://admin:admin@libaryregister.pvoei77.mongodb.net/?retryWrites=true&w=majority&appName=LibaryRegister";
const client = new MongoClient(uri);
const databaseName: string = "LibaryRegister";
const collectionName: string = "user";


export class UserController {

    constructor() {
    }
    getAllUsers = async (req, res) => {
        try {
            await client.connect();
            const db = client.db(databaseName);
            const collection = db.collection(collectionName);
            const users = await collection.find({}).toArray();
            // Properly cast each document to User type
            res = users.map(doc => ({
                id: doc.id,
                name: doc.name,
                address: doc.address,
                phone: doc.phone,
                idCard: doc.idCard,
                status: doc.status
            }));
        } catch (err) {
            console.error("Error retrieving users:", err);
            throw err;
        } finally {
            await client.close();
        }
    };
    

    public async getAllUsers2():Promise<User[]> {
        try {
            await client.connect();
            const db = client.db(databaseName);
            const collection = db.collection(collectionName);
            const users = await collection.find({}).toArray();
            // Properly cast each document to User type
            return users.map(doc => ({
                id: doc.id,
                name: doc.name,
                address: doc.address,
                phone: doc.phone,
                idCard: doc.idCard,
                status: doc.status
            }));
        } catch (err) {
            console.error("Error retrieving users:", err);
            throw err;
        } finally {
            await client.close();
        }
    }

    public async getUserById(id: string): Promise<User | null> {
        try {
            await client.connect();
            const db = client.db(databaseName);
            const collection = db.collection(collectionName);
            const user = await collection.findOne({ _id: new ObjectId(id) });

            if (user) {
                // Properly cast the document to User type
                return {
                    id: user.id = 1,
                    name: user.name,
                    address: user.address,
                    phone: user.phone,
                    idCard: user.idCard,
                    status: user.status
                };
            } else {
                return null;
            }
        } catch (err) {
            console.error("Error retrieving user:", err);
            throw err;
        } finally {
            await client.close();
        }
    }

    public async createUser(user: any): Promise<void> {
        try {
            await client.connect();
            const db = client.db(databaseName);
            const collection = db.collection(collectionName);
            // Retrieve the maximum id value from the database
        const maxId = await collection.findOne({}, { sort: { id: -1 } });

        // Increment the maximum id value by one
        const newId = maxId ? maxId.id + 1 : 1;

        // Set the id element of the item.body to the new id
        user.body.id = newId;
            await collection.insertOne(user.body);
        } catch (err) {
            console.error("Error creating user:", err);
            throw err;
        } finally {
            await client.close();
        }
    }

    public async updateUser(id: string, updatedFields: Partial<User>): Promise<void> {
        try {
            await client.connect();
            const db = client.db(databaseName);
            const collection = db.collection(collectionName);
            await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedFields });
        } catch (err) {
            console.error("Error updating user:", err);
            throw err;
        } finally {
            await client.close();
        }
    }

    public async deleteUser(id: string): Promise<void> {
        try {
            await client.connect();
            const db = client.db(databaseName);
            const collection = db.collection(collectionName);
            await collection.deleteOne({ _id: new ObjectId(id) });
        } catch (err) {
            console.error("Error deleting user:", err);
            throw err;
        } finally {
            await client.close();
        }
    }
}
