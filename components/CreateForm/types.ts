import type { Auth } from 'firebase/auth';
import type { UploadFile } from "antd";
import type { Currency } from "types/category/Common";

export type UploadImageType = (images: File[], postId: string, auth: Auth) => Promise<string[]>;

export interface IProps<T> {
    children?: React.ReactNode;
    geenricTypes?: T;
    onFinish: (values: (IOnFinish & T), cities: ICity[], images: string[], postId: string) => Promise<void>;
    componentState?: {
        disableTitleItem: boolean;
    }
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

export interface ICity {
    name: string;
    id: string,
}