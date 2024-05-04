import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { User } from '../entity/User';
import { mongoService } from './base.controller';

export async function createUser() {
    await mongoService.createCollection("user");
}
export async function insertUser(user: User) {
    await mongoService.insertOneCollection("user", user);
}

export async function listUser(): Promise<User[]> {
    return await mongoService.listCollection("user", {}, {});
}

export async function updateUser(user: User) {
    await mongoService.updateOneCollection("user", { _id: new ObjectId(user._id) }, { $set: { status: user.status } });
}

export async function deleteUser(userId: string) {
    await mongoService.deleteOneCollection("user", { _id: new ObjectId(userId) });
}