import { Injectable } from '@angular/core';
import {Adapter} from '../services/adapter';

export class Goal {
  constructor(
    public id: number,
    public goalMinute: number,
    public match: number,
    public footballer: number,
    public side: string
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class GoalAdapter implements Adapter<Goal> {
  adapt(from: any) {
    return new Goal(
      from.id,
      from.goalMinute,
      from.match,
      from.footballer,
      from.side,
    );
  }
}
