import type { NextApiRequest, NextApiResponse } from 'next/types';
import { adminApp } from '../../fb/adminSdk';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let mail = req.query?.["mail"] as string | undefined

    if (!mail) return res.status(400).json({ error: "No mail in parameter" })


    let data = await adminApp.firestore().collection("users").limit(1).where("mail", "==", mail).get()
    let docs = data.docs

    if (docs.length === 0) {
        return res.status(404).json({ error: "There is no such a user" })
    }

    return res.status(200).json({ user: docs[0] })
}