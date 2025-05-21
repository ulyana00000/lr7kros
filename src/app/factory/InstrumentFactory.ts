import { Guitar } from '../classes/Guitar';
import { Piano } from '../classes/Piano';
import { Drums } from '../classes/Drums';

import { IInstrument } from '../models/IInstrument';
import { RentableInstrument } from '../classes/RentableInstrument';

export class InstrumentFactory {
  static create(data: any): IInstrument {
    let baseInstrument: IInstrument;

    switch (data.type) {
      case 'guitar':
        baseInstrument = new Guitar(data.name, data.price, data.guitarType, data.strings);
        break;
      case 'piano':
        baseInstrument = new Piano(data.name, data.price, data.keys, data.mechanism);
        break;
      case 'drums':
        baseInstrument = new Drums(data.name, data.price, data.pieces, data.hasPedal);
        break;
      default:
        throw new Error('Unknown instrument type');
    }

    // Додаємо оренду лише деяким
    if (data.rentPricePerDay) {
      return new RentableInstrument(baseInstrument, data.rentPricePerDay);
    }

    return baseInstrument;
  }
}
