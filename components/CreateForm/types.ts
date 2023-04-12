import type { Auth } from 'firebase/auth';
import type { Currency } from "types/category/Common";
import type { ICity } from 'types/city';

export type UploadImageType = (images: File[], postId: string, auth: Auth) => Promise<string[]>;

export interface IProps<T> {
    children?: React.ReactNode;
    onFinish: (values: (IOnFinish & T), cities: ICity[], images: string[], postId: string) => Promise<void>;
    componentState?: {
        disableTitleItem: boolean;
    },
    cityList: ICity[],
    disableImageUpload?: boolean
}

export interface IOnFinish {
    title?: string;
    about: string;
    currency: Currency;
    price: number;
    city: string;
    contactName: string;
    email: string;
    phone: string;
    isWp: boolean;
    isCall: boolean;
    fileList: File[];
}

