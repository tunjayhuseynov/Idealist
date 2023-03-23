import { storage } from "fb";
import type { Auth } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes, UploadMetadata } from "firebase/storage";



export const uploadImages = async (fileList: File[], postId: string, auth: Auth) => {
    let urls = []
    if (!auth.currentUser?.uid) throw new Error("User not found")

    for (let file of fileList) {
        const f = file;

        const metadata: UploadMetadata = {
            contentType: 'image/jpeg',
            customMetadata: {
                'timestamp': new Date().getTime().toString(),
            }
        }
        const name = crypto.randomUUID()
        const storageRef = ref(storage, `users/${auth.currentUser.uid}/${postId}/${name}.png`);
        try {
            const image = await uploadBytes(storageRef, f, metadata);
            const url = await getDownloadURL(image.ref);
            urls.push(url)
        } catch (e: any) {
            console.error(e)
        }
    }

    return urls;
}