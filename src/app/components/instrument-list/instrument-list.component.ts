import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InstrumentService } from '../../services/instrument.service';
import { IInstrument } from '../../models/IInstrument';
import { NgFor } from '@angular/common';
import { IRentable } from '../../models/IRentable';
import { InstrumentFactory } from '../../factory/InstrumentFactory';
import { RouterModule } from '@angular/router';
import { InstrumentFormComponent } from '../instrument-form/instrument-form.component';
import { InstrumentEditComponent } from '../instrument-edit/instrument-edit.component';
@Component({
  standalone: true,
  selector: 'app-instrument-list',
  templateUrl: './instrument-list.component.html',
  styleUrls: ['./instrument-list.component.scss'], // ← МАЄ БУТИ
  imports: [IonicModule, CommonModule, NgFor,InstrumentFormComponent, RouterModule, InstrumentEditComponent],
})

export class InstrumentListComponent implements OnInit {
  instruments: IInstrument[] = [];
showEditor = false;

  toastOpen = false;
  toastMessage = '';

  constructor(private service: InstrumentService) {}

  ngOnInit() {
    this.service.getInstruments().subscribe((data) => {
      this.instruments = data;
    });
  }

addInstrumentToList(data: any) {
  const instrument = InstrumentFactory.create(data);
  this.instruments.push(instrument);

 const mapType: Record<string, string> = {
  'Гітара': 'guitar',
  'Піаніно': 'piano',
  'Барабани': 'drums'
};


  const rawData = this.instruments.map(i => ({
    name: i.getName(),
    price: i.getPrice(),
    type: mapType[i.getType()] || i.getType().toLowerCase(),
    ...this.extractDetails(i)
  }));

  this.service.saveInstruments(rawData).subscribe({
    next: () => console.log('✅ Дані оновлено на сервері'),
    error: (err) => console.error('❌ Помилка при збереженні:', err)
  });
}

extractDetails(instr: any): any {
  if (instr.getType() === 'Гітара') {
    return {
      guitarType: instr.guitarType || '',
      strings: instr.strings || 6,
      rentPricePerDay: instr.rentPricePerDay
    };
  }

  if (instr.getType() === 'Піаніно') {
    return {
      keys: instr.keys || 88,
      mechanism: instr.mechanism || '',
      rentPricePerDay: instr.rentPricePerDay
    };
  }

  if (instr.getType() === 'Барабани') {
    return {
      pieces: instr.pieces || 5,
      hasPedal: instr.hasPedal || false,
      rentPricePerDay: instr.rentPricePerDay
    };
  }

  return {};
}

onInstrumentUpdated(event: { index: number; data: any }) {
  const { index, data } = event;

  // Створюємо новий інструмент із оновленими даними
  const updated = InstrumentFactory.create(data);

  // Замінюємо в масиві
  this.instruments[index] = updated;

  // Формуємо дані для збереження
  const rawData = this.instruments.map(i => {
    const mapType: Record<string, string> = {
      'Гітара': 'guitar',
      'Піаніно': 'piano',
      'Барабани': 'drums'
    };

    return {
      name: i.getName(),
      price: i.getPrice(),
      type: mapType[i.getType()] || i.getType().toLowerCase(),
      ...this.extractDetails(i)
    };
  });

  this.service.saveInstruments(rawData).subscribe({
    next: () => console.log('✅ Інструмент оновлено'),
    error: (err) => console.error('❌ Помилка збереження:', err)
  });
}



  isRentable(instr: any): instr is IRentable {
    return typeof instr.rent === 'function';
  }

  buy(instr: IInstrument) {
    this.toastMessage = `✅ Ви купили ${instr.getName()} за ${instr.getPrice()} грн`;
    this.toastOpen = true;
  }

  rent(instr: IInstrument) {
    if (this.isRentable(instr)) {
      const days = 3;
      const cost = instr.rent(days);
      this.toastMessage = `💰 Оренда ${instr.getName()} на ${days} днів = ${cost} грн`;
      this.toastOpen = true;
    }
  }
}
