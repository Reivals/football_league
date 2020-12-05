import { Injectable } from '@angular/core';
import {Adapter} from '../services/adapter';

export class Card {
  constructor(
    public id: number,
    public minute: number,
    public match: number,
    public footballer: number,
    public side: string,
    public reason: string,
    public type: string
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class CardAdapter implements Adapter<Card> {
  adapt(from: any) {
    return new Card(
      from.id,
      from.minute,
      from.match,
      from.footballer,
      from.side,
      from.reason,
      from.type
    );
  }
}
