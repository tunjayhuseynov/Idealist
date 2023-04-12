import { db } from "fb";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, QueryConstraint, setDoc, updateDoc } from "firebase/firestore";
import ICrud from "types/utils/crud";

export type Collections = "animals" | "auto" | "bina" | "home" | "job" | "electro" | "service" | "job" | "hobby" | "child";

export class Crud<T> implements ICrud<T> {
    collection: string;

    constructor(collection: string) {
        this.collection = collection;
    }

    async GetOne(id: string): Promise<T> {
        const itemDoc = await getDoc(doc(db, this.collection, id))
        if (!itemDoc.exists()) throw new Error("Not found");

        return itemDoc.data() as T;
    }

    async GetAll({ order, limit: L }: { order?: { name: string, desc: boolean }, limit?: number } = {}): Promise<T[]> {
        const queryFilter: QueryConstraint[] = [];
        if (!order && !L) {
            const itemDocs = await getDocs(collection(db, this.collection));
            return itemDocs.docs.map((doc) => ({id: doc.id, ...doc.data() as T}));
        }

        if (order) {
            queryFilter.push(orderBy(order.name, order.desc ? "desc" : "asc"));
        }
        if (L) {
            queryFilter.push(limit(L));
        }

        const q = query(collection(db, this.collection), ...queryFilter)

        const itemDocs = await getDocs(q);

        return itemDocs.docs.map((doc) => ({id: doc.id, ...doc.data() as T}));
    }

    async Create(data: T): Promise<T> {
        await addDoc(collection(db, this.collection), data as any);

        return data;
    }

    async Update(data: Partial<T> & { id: string }): Promise<Partial<T>> {
        await updateDoc<T>(doc(db, this.collection, data.id) as any, data as any);

        return data;
    }

    async Delete(id: string): Promise<boolean> {
        await deleteDoc(doc(db, this.collection, id));

        return true;
    }
}