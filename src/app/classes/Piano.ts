import { IInstrument } from '../models/IInstrument';

export class Piano implements IInstrument {
  constructor(
    private name: string,
    private price: number,
    private keys: number,
    private mechanism: string
  ) {}

  getName() {
    return this.name;
  }

  getType() {
    return 'Піаніно';
  }

  getPrice() {
    return this.price;
  }

  getDetails() {
    return `Клавіш: ${this.keys}, Механіка: ${this.mechanism}`;
 
 }
getRawType() {
  return 'piano';
}

}
