import type { Auth } from 'firebase/auth';
import type { Currency } from "types/category/Common";
import type { ICity } from 'types/city';

export type UploadImageType = (
  images: File[],
  postId: string,
  auth: Auth
) => Promise<string[]>;

export interface IProps<T> {
  children?: React.ReactNode;
  cityList: ICity[],
  disableImageUpload?: boolean
  geenricTypes?: T;
  onFinish: (
    values: IOnFinish & T,
    cities: ICity[],
    images: string[],
    postId: string,
    lat: number,
    lng: number
  ) => Promise<void>;
  componentState?: ComponentState;
}

export interface ComponentState {
  disableTitleItem?: boolean;
  disableRegionItem?: boolean;
  disableVillageItem?: boolean;
  disableMetroItem?: boolean;
  disableMapItem?: boolean;
}

export interface IOnFinish {
  title?: string;
  about: string;
  currency: Currency;
  price: number;
  city: string;
  region?: string,
  village?: string,
  metro?: string,
  contactName: string;
  email: string;
  phone: string;
  isWp: boolean;
  isCall: boolean;
  fileList: File[];
}