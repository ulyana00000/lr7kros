import { IInstrument } from '../models/IInstrument';

export class Guitar implements IInstrument {
  constructor(
    private name: string,
    private price: number,
    private guitarType: string,
    private strings: number
  ) {}

  getName() {
    return this.name;
  }

  getType() {
    return 'Гітара';
  }

  getPrice() {
    return this.price;
  }

  getDetails() {
    return `Тип: ${this.guitarType}, Струни: ${this.strings}`;
  }

getRawType() {
  return 'guitar';
}


}
