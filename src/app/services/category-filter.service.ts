import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { InstrumentService } from './instrument.service';
import { IInstrument } from '../models/IInstrument';
import { IRentable } from '../models/IRentable';

@Injectable({ providedIn: 'root' })
export class CategoryFilterService {
  private selectedCategory$ = new BehaviorSubject<string>('all');
  private rentOnly$ = new BehaviorSubject<boolean>(false);

  constructor(private instrumentService: InstrumentService) {}

  setCategory(category: string) {
    this.selectedCategory$.next(category);
  }

  setRentOnly(rentOnly: boolean) {
    this.rentOnly$.next(rentOnly);
  }

  getFilteredInstruments(): Observable<IInstrument[]> {
    return combineLatest([
      this.instrumentService.getInstruments(),
      this.selectedCategory$,
      this.rentOnly$
    ]).pipe(
      map(([instruments, category, rentOnly]) => {
        let filtered = instruments;

        if (category !== 'all') {
          filtered = filtered.filter(
            instr => this.normalize(instr.getType()) === category
          );
        }

        if (rentOnly) {
          filtered = filtered.filter(i => 'rent' in i && typeof i.rent === 'function');
        }

        return filtered;
      }),
      shareReplay(1)
    );
  }

  private normalize(type: string): string {
    const map: Record<string, string> = {
      'гітара': 'guitar',
      'пiанiно': 'piano',
      'піаніно': 'piano',
      'барабани': 'drums',
      'guitar': 'guitar',
      'piano': 'piano',
      'drums': 'drums'
    };
    return map[type.trim().toLowerCase()] || type.toLowerCase();
  }
}
