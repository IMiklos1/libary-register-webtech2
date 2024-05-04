import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { Item } from '../entity/Item';
import { mongoService } from './base.controller';

export async function createitem() {
    await mongoService.createCollection("Item");
}
export async function insertitem(item: Item) {
    await mongoService.insertOneCollection("item", item);
}

export async function listitem(): Promise<Item[]> {
    return await mongoService.listCollection("item", {}, {});
}

export async function updateitem(item: Item) {
    await mongoService.updateOneCollection("item", { _id: new ObjectId(item._id) }, { $set: { status: item.status } });
}

export async function deleteitem(itemId: string) {
    await mongoService.deleteOneCollection("item", { _id: new ObjectId(itemId) });
}