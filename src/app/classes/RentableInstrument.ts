import { IInstrument } from '../models/IInstrument';
import { IRentable } from '../models/IRentable';

export class RentableInstrument implements IInstrument, IRentable {
  constructor(
    private instrument: IInstrument,
    public rentPricePerDay: number
  ) {}

  getName() {
    return this.instrument.getName();
  }

  getType() {
    return this.instrument.getType();
  }

  getPrice() {
    return this.instrument.getPrice();
  }

  getDetails() {
    return this.instrument.getDetails() ;
  }

  rent(days: number) {
    return this.rentPricePerDay * days;
  }
}
