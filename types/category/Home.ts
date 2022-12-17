export interface IHome {
    name: string,
    new: boolean,
    types: {
        name: string
    }[] | null
}