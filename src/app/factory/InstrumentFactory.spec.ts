import { InstrumentFactory } from './InstrumentFactory';
import { Guitar } from '../classes/Guitar';
import { RentableInstrument } from '../classes/RentableInstrument';

describe('InstrumentFactory', () => {
  it('створює гітару', () => {
    const data = {
      type: 'guitar',
      name: 'Test Guitar',
      price: 10000,
      guitarType: 'електро',
      strings: 6
    };

    const instrument = InstrumentFactory.create(data);
    expect(instrument).toBeInstanceOf(Guitar);
    expect(instrument.getName()).toBe('Test Guitar');
  });

  it('створює орендовану гітару', () => {
    const data = {
      type: 'guitar',
      name: 'Rentable',
      price: 10000,
      guitarType: 'електро',
      strings: 6,
      rentPricePerDay: 100
    };

    const instrument = InstrumentFactory.create(data);
    expect(instrument).toBeInstanceOf(RentableInstrument);
  });
});
