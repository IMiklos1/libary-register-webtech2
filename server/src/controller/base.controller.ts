import { URL, DATABASENAME } from "../configuration";
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin@libaryregister.pvoei77.mongodb.net/?retryWrites=true&w=majority&appName=LibaryRegister";
const client = new MongoClient(uri);
const databaseName: string = "LibaryRegister";
const collectionName: string = "auth-user";
class MongoService {
    constructor() {}


    createCollection(collectionName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            client.connect()
            .then(db => {
                var dbo = db.db(databaseName);
                return dbo.createCollection(collectionName).then((result) => {
                    console.log(`Collection ${collectionName} created!`);
                    db.close();
                    resolve();
                }, (error) => {
                    throw error;
                })
                .catch((error) => {
                    db.close();
                    reject(error.message);
                })
                .finally(() => {
                    //db.close();
                })
            }, (error) => {
                console.log(error);
                reject(error.message);
            });
        });
    }

    insertOneCollection(collectionName: string, collection: any): Promise<void> {
        return new Promise((resolve, reject) => {
            client.connect()
                .then((db) => {
                    var dbo = db.db(databaseName);
                    return dbo.collection(collectionName).insertOne(collection, {
                        useUnifiedTopology: true,
                        useNewUrlParser: true,
                    }).then((collection) => {
                        if (collection.insertedCount != 1) {
                            throw new Error("Nem sikerült a felvitel");
                        }
                        db.close();
                        resolve();
                    }).catch(err => {
                        console.log(`DB Connection Error: ${err.message}`);
                        db.close();
                        reject(err.message);
                    }).finally(() => {
                        console.log('Close DB');
                        db.close();
                    })
                });
        });
    }

    listCollection(collectionName: string, query1: any, query2: any): Promise<any> {
        return new Promise((resolve, reject) => {
            client.connect()
                .then((db) => {
                    var dbo = db.db(databaseName);

                    return dbo.collection(collectionName).find(query1, query2).toArray().then((collection) => {
                        db.close();
                        resolve(collection);
                    }).catch(err => {
                        console.log(`DB Connection Error: ${err.message}`);
                        db.close();
                        reject(err.message);
                    }).finally(() => {
                        console.log('Close DB');
                        db.close();
                    })
                });
        });
    }

    updateOneCollection(collectionName: string, query: any, newValues: any): Promise<void> {
        return new Promise((resolve, reject) => {
            client.connect()
                .then((db) => {
                    var dbo = db.db(databaseName);
                    console.log(newValues);
                    return dbo.collection(collectionName).updateOne(query, newValues).then((collection) => {
                        console.log(collection);
                        if (collection.modifiedCount == 0) {
                            throw new Error("Nem sikerült a módosítás");
                        }
                        db.close();
                        resolve();
                    }).catch(err => {
                        console.log(`DB Error: ${err.message}`);
                        //error = err;
                        db.close();
                        reject(err.message);
                    }).finally(() => {
                        console.log('Close DB');
                        db.close();
                    })
                });
        });
    }

    deleteOneCollection(collectionName: string, query: any): Promise<void> {
        return new Promise((resolve, reject) => {
            client.connect()
                .then((db) => {
                    var dbo = db.db(databaseName);
                    return dbo.collection(collectionName).deleteOne(query).then((collection) => {
                        if (collection.deletedCount == 0) {
                            throw new Error("Nem sikerült a törlés");
                        }
                        db.close();
                        resolve();
                    }).catch(err => {
                        console.log(`DB Connection Error: ${err.message}`);
                        db.close();
                        reject(err.message);
                    }).finally(() => {
                        console.log('Close DB');
                        db.close();
                    })
                });
        });
    }

    deleteCollection(collectionName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            client.connect()
                .then((db) => {
                    var dbo = db.db(databaseName);
                    return dbo.collection(collectionName).drop().then((collection) => {
                        if (collection.deletedCount == 0) {
                            throw new Error("Nem sikerült a törlés");
                        }
                        db.close();
                        resolve(collection);
                    }).catch(err => {
                        console.log(`DB Connection Error: ${err.message}`);
                        db.close();
                        reject(err.message);
                    }).finally(() => {
                        console.log('Close DB');
                        db.close();
                    })
                });
        });
    }
}

export let mongoService = new MongoService();