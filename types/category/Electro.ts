export interface IElectro {
  activateComputerMark: boolean;
  activatePhoneMark: boolean;
  activateType: boolean;
  activateoperator: boolean;
  name: string;
  types:
    | {
        name: string;
      }[]
    | null;
}
