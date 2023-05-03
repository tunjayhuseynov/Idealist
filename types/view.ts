import { Currency } from "./category/Common";

export const currencies: {[name in keyof typeof Currency]: string} = {
    "AZN": "₼",
    "USD": "$"
}