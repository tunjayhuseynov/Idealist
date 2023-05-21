export const BinaContracts = {
  cixaris: "Çıxarış (Kupça)",
  muqavile: "Müqavilə",
  order: "Order",
  serencam: "Sərəncam",
  akt: "Dövlət aktı",
  kitabca: "Qeydiyyat kitabçası",
  belediyye: "Bələdiyyə sərəncamı",
  paket: "Paket sənəd",
  icare: "Çıxarış (İcarə)",
  kupcasiz: "Çıxarışsız (Kupçasız)",
} as const;

export const BinaRentPros = {
  cabelTv: "Kabel Tv",
  pvcWindow: "PVC Pəncərələr",
  combi: "Kombi",
  centralHeatingSystem: "Mərkəzi istilik sistemi",
  garage: "Qaraj",
  parkingArea: "Parking ərazisi",
  balcony: "Eyvan",
  lift: "Lift",
  pool: "Hovuz",
  kitchen: "Mətbəx",
  dishes: "Qab-qacaq",
  washer: "Paltar yuyan",
  refrigerator: "Soyuducu",
  tv: "Televizor",
  airConditioner: "Kondisioner",
  internet: "Internet",
  telephone: "Telefon xətti",
} as const;

export const BinaRentNotAllowed = {
  noChild: "Uşaqlı olmaz",
  noAnimal: "Heyvan saxlamaq olmaz",
  noSmoking: "Siqaret çəkmək olmaz",
} as const;

export const NearbyLocationNames = {
  school: "Məktəb",
  busstop: "Avtobus dayanacağı",
  hospital: "Xəstəxana",
  mall: "Ticarət mərkəzi",
  kindigarden: "Uşaq bağçası",
  market: "Super market",
} as const;

export const Communal = {
  gas: "Qaz",
  water: "Su",
  light: "İşıq",
  sewerage: "Kanalizasiya",
} as const;

export const LandAppointments = {
  agriculture: "Kənd təsərrüfatı təyinatlı torpaq",
  living: "Yaşayış məntəqələrinin torpaqları",
  industrial: "Sənaye, nəqliyyat, rabitə, müdafiə və digər təyinatlı torpaqlar",
  protectedLand: "Xüsusi qorunan ərazilərin torpaqları",
  forest: "Meşə fondu torpaqları",
  waterReserve: "Su fondu torpaqları",
  landReserve: "Ehtiyat fondu torpaqları",
};

export const BinaRentPropertyTypeOptions = [
  { label: "Bütün yer", value: "whole" },
  { label: "Tək otaq", value: "onlyRoom" },
] as const;

export const BinaRepairing = {
  repaired: "Təmirli",
  unrepared: "Təmirsiz",
  halfRepaired: "Orta",
} as const;
