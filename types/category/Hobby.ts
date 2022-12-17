export interface IHobby {
    delivery: boolean,
    name: string,
    new: boolean,
    types: {
        name: string
    }[] | null
}
