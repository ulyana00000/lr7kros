import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InstrumentListComponent } from '../components/instrument-list/instrument-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, InstrumentListComponent],
  templateUrl: './home.page.html',
})
export class HomePage {}
