import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class UpdateEmitterService {

  footballersUpdate = new EventEmitter();
  clubsUpdate = new EventEmitter();
  matchesUpdate = new EventEmitter();
  goalsUpdate = new EventEmitter();

  constructor() { }

  updateFootballers() {
    this.footballersUpdate.emit();
  }

  updateClubs() {
    this.clubsUpdate.emit();
  }

  updateMatches() {
    this.matchesUpdate.emit();
  }

  updateGoals() {
    this.goalsUpdate.emit();
  }
}
