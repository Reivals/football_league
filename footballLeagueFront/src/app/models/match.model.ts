import {Injectable} from '@angular/core';
import {Adapter} from '../services/adapter';
import {Goal} from './goal.model';
import {Card} from './card.model';

export class Match {
  constructor(
    public id: number,
    public homeSide: number,
    public awaySide: number,
    public matchDate: Date,
    public goals: Goal[],
    public cards: Card[],
    public result: string
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class MatchAdapter implements Adapter<Match> {
  adapt(from: any) {
    return new Match(
      from.id,
      from.homeSide,
      from.awaySide,
      from.matchDate,
      from.goals,
      from.cards,
      from.result,
    );
  }
}
