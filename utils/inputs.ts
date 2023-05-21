export const InputNumberFormatter = (value: string | undefined) =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const InputNumberParser = (value: string | undefined) =>
  value?.replace(/\$\s?|(,*)/g, "") ?? "";
