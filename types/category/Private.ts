export interface IPrivate {
    delivery: boolean;
    name: string;
    new: boolean;
    types: {
        name: string;
    }[] | null;
    genders: {
        name: string;
        types: {
            name: string;
        }[] | null;
    }[] | null;
}
