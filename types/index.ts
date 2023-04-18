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
	"Aylıq": "Aylıq",
	"Günlük": "Günlük",
	"Həftəlik": "Həftəlik"
} as const