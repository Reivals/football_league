import { Injectable } from '@angular/core';
import {Adapter} from '../services/adapter';

export class Footballer {
  constructor(public club: number,
              public dateOfBirth: string,
              public id: number,
              public name: string,
              public nationality: string,
              public position: string,
              public surname: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class FootballerAdapter implements Adapter<Footballer> {
  adapt(item: any): Footballer {
    return new Footballer(
      item.club,
      item.dateOfBirth,
      item.id,
      item.name,
      item.nationality,
      item.position,
      item.surname
    );
  }
}
