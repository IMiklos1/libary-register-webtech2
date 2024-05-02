
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin@libaryregister.pvoei77.mongodb.net/?retryWrites=true&w=majority&appName=LibaryRegister";

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
export class DataSource{
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

}
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

export async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully");
        const database = client.db("libary-register");
        const collection = database.collection("users");

        // Example: Inserting a user document
        await collection.insertOne({
            username: "example",
            email: "example@example.com",
            password: "examplepassword",
        });

        // Example: Finding users
        const users = await collection.find({}).toArray();
        console.log("Users:", users);
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    } finally {
        await client.close();
    }
}