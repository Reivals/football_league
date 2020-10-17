import {Injectable} from '@angular/core';
import {Adapter} from '../services/adapter';

export class Club {
  constructor(public city: string,
              public country: string,
              public id: number,
              public name: string) {
  }

}

@Injectable({
  providedIn: 'root'
})
export class ClubAdapter implements Adapter<Club> {

  adapt(item: any): Club {
    return new Club(
      item.city,
      item.country,
      item.id,
      item.name
    );
  }
}
