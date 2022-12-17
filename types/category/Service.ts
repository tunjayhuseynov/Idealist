export interface IService {
    name: string;
    lableName: string;
    new: boolean;
    delivery: boolean;
    types: {
        name: string;
    }[] | null;
}