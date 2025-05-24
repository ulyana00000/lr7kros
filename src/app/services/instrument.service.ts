import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { InstrumentFactory } from '../factory/InstrumentFactory';
import { IInstrument } from '../models/IInstrument';

@Injectable({
    providedIn: 'root'
  })
  export class InstrumentService {
    private apiUrl = 'https://api.jsonbin.io/v3/b/68152f2f8561e97a500c8aae'; // твій URL
  
    constructor(private http: HttpClient) {}
  
    getInstruments() {
      return this.http.get<any>(this.apiUrl).pipe(
        map(data => {
  console.log('⬇️ Отримано з API:', data); // ← сюди дивись в консолі
  const items = data?.record?.record;
  if (!Array.isArray(items)) {
    throw new Error('❌ Очікував масив у "record"');
  }
  return items.map(item => InstrumentFactory.create(item));
})

      );
    }
    
    saveInstruments(instruments: any[]) {
  const url = 'https://api.jsonbin.io/v3/b/68152f2f8561e97a500c8aae';
  const body = {
    record: instruments
  };

  const headers = {
    'Content-Type': 'application/json',
    'X-Master-Key': '$2a$10$OC1AL3ICqE1ZSpOGf5P8euHLcEbfk2hqCYdpxLM9f4.ykF7M5MNEK'
  };

  return this.http.put(url, body, { headers });
}






  }
  
