import { MongoClient, ServerApiVersion } from 'mongodb';
import bcrypt = require('bcrypt');
import jwt = require('jsonwebtoken');

const uri = "mongodb+srv://admin:admin@libaryregister.pvoei77.mongodb.net/?retryWrites=true&w=majority&appName=LibaryRegister";
const client = new MongoClient(uri);
const databaseName: string = "LibaryRegister";
const collectionName: string = "auth-user";

export class AuthUserController {
 
    constructor() {
    };

    public async create(req, res) {
        try {
            await client.connect();
            const db = client.db(databaseName);
            const collection = db.collection(collectionName);

            const { firstName, lastName, email, password } = req.body;

            // Check if the user already exists
            const existingUser = await collection.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User with this email already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Create the user document
            const user = {
                firstName,
                lastName,
                email,
                password: hashedPassword
            };

            // Save the user document to the database
            await collection.insertOne(user);

            res.json({ message: 'User created successfully' });
        } catch (err) {
            console.error("Error creating user:", err);
            res.status(500).json({ message: 'Internal Server Error' });
        } finally {
            await client.close();
        }
    }

    public async login(req, res) {
        try {
            await client.connect();
            const db = client.db(databaseName);
            const collection = db.collection(collectionName);

            const { email, password } = req.body;

            // Find the user by email
            const user = await collection.findOne({ email });

            if (!user) {
                return res.status(401).json({ message: 'Incorrect email or password' });
            }

            // Compare passwords
            const passwordMatches = await bcrypt.compare(password, user.password);

            if (!passwordMatches) {
                return res.status(401).json({ message: 'Incorrect email or password' });
            }

            // Create JWT token
            const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '2w' });

            res.json({ token });
        } catch (err) {
            console.error("Error during login:", err);
            res.status(500).json({ message: 'Internal Server Error' });
        } finally {
            await client.close();
        }
    }
}
