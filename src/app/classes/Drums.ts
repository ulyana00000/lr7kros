import { IInstrument } from '../models/IInstrument';

export class Drums implements IInstrument {
  constructor(
    private name: string,
    private price: number,
    private pieces: number,
    private hasPedal: boolean
  ) {}

  getName() {
    return this.name;
  }

  getType() {
    return 'Барабани';
  }

  getPrice() {
    return this.price;
  }

  getDetails() {
    return `Барабанів: ${this.pieces}, Педаль: ${this.hasPedal ? 'є' : 'нема'}`;
  }

getRawType() {
  return 'drums';
}

}
