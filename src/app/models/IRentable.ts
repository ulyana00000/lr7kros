export interface IRentable {
    rentPricePerDay: number;
    rent(days: number): number;
  }
  