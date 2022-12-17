export interface IChild {
    delivery: boolean,
    name: string,
    new: boolean,
    genders: {
        name: string,
        types: {
            name: string,
            clothesColor: boolean,
            shoesSize: boolean
        }[] | null
    }[] | null
    types: {
        name: string
    }[] | null

}