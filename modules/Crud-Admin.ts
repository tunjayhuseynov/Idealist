import { adminApp } from "fb/adminSdk";
import ICrud from "types/utils/crud";

export type Collections = "animals" | "auto" | "bina" | "home" | "job" | "electro" | "service" | "job" | "hobby" | "child";

export class AdminCrud<T> implements ICrud<T> {
    collection: string;

    constructor(collection: string) {
        this.collection = collection;
    }

    async GetOne(id: string): Promise<T> {
        const itemDoc = await adminApp.firestore().collection(this.collection).doc(id).get()
        if (!itemDoc.exists) throw new Error("Not found");

        return itemDoc.data() as T;
    }

    async GetAll({ order, limit: L }: { order?: { name: string, desc: boolean }, limit?: number } = {}): Promise<T[]> {
        if (!order && !L) {
            const itemDocs = await adminApp.firestore().collection(this.collection).get();
            return itemDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() as T }));
        }
        let connection:
            FirebaseFirestore.Query<FirebaseFirestore.DocumentData> | FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
            = adminApp.firestore().collection(this.collection);

        if (order) {
            connection = connection.orderBy(order.name, order.desc ? "desc" : "asc")
        }
        if (L) {
            connection = connection.limit(L)
        }

        const itemDocs = await connection.get();

        return itemDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() as T }));
    }

    async Create(data: T): Promise<T> {
        await adminApp.firestore().collection(this.collection).add(data as any);

        return data;
    }

    async Update(data: Partial<T> & { id: string }): Promise<Partial<T>> {
        await adminApp.firestore().collection(this.collection).doc(data.id).update(data)

        return data;
    }

    async Delete(id: string): Promise<boolean> {
        await adminApp.firestore().collection(this.collection).doc(id).delete()

        return true;
    }
}