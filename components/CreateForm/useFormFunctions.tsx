import { Select, UploadFile } from "antd";
import { storage } from "fb";
import type { Auth } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes, UploadMetadata } from "firebase/storage";



export default function useFormFunctions() {
    const uploadImages = async (fileList: UploadFile<File>[], postId: string, auth: Auth): Promise<string[]> => {
        let urls = []
        if (!auth.currentUser?.uid) throw new Error("User not found")

        for (let file of fileList) {
            const f = file.originFileObj as File;

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
    

    const NumberPrefixes = (
        <Select>
            <Select.Option value="070">070</Select.Option>
            <Select.Option value="077">077</Select.Option>
            <Select.Option value="055">055</Select.Option>
            <Select.Option value="050">050</Select.Option>
            <Select.Option value="051">051</Select.Option>
        </Select>
    );

    return { uploadImages, NumberPrefixes }
}