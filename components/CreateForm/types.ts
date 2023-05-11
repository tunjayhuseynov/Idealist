import type { Auth } from "firebase/auth";
import type { Currency, IToMetro } from "types/category/Common";
import type { ICity } from "types/city";

export type UploadImageType = (
  images: File[],
  postId: string,
  auth: Auth
) => Promise<string[]>;

export interface ICreateFormProps<T> {
  children?: React.ReactNode;
  cityList: ICity[];
  disableImageUpload?: boolean;
  genericTypes?: T;
  onFinish: (
    values: IOnFinish & T,
    cities: ICity[],
    images: string[],
    postId: string,
    coordinates: {
      lat: number;
      lng: number;
    }
  ) => Promise<void>;
  componentState?: IComponentState;
}

export interface IComponentState {
  disableTitleItem?: boolean;
  disableRegionItem?: boolean;
  disableVillageItem?: boolean;
  disableMetroItem?: boolean;
  disableMapItem?: boolean;
}

export interface IOnFinish {
  title?: string;
  about: string;
  currency: keyof typeof Currency;
  price: number;
  city: string;
  region?: string;
  village?: string;
  metro?: string | "noMetro";
  toMetro?: { transport: keyof typeof IToMetro, minutes: number }
  contactName: string;
  email: string;
  phone: string;
  isWp: boolean;
  isCall: boolean;
  fileList: File[];
}
