export type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
    infer ElementType
>
    ? ElementType
    : never


export const currencies = {
    "azn": "₼",
    "usd": "$"
}

export const IRentDuration = {
	"monthly": "Aylıq",
	"daily": "Günlük",
	"weekly": "Həftəlik"
} as const