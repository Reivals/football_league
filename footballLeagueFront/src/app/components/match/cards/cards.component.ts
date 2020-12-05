import {Component, Input, OnInit} from '@angular/core';
import {Match} from '../../../models/match.model';
import {Footballer} from '../../../models/footballer.model';
import {FootballerService} from '../../../services/footballer.service';
import {ClubService} from '../../../services/club.service';
import {ToastrService} from 'ngx-toastr';
import {UpdateEmitterService} from '../../../services/update-emitter.service';
import {Card} from '../../../models/card.model';
import {CardService} from '../../../services/card.service';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() match: Match;
  @Input() homeCards: Card[];
  @Input() awayCards: Card[];
  public willUpdate = false;

  public footballers: Footballer[];

  private homeFootballers: Footballer[];
  private awayFootballers: Footballer[];

  public formFootballers: Footballer[] = [];

  public cardCandidate: Card = new Card(null, null, null, null, null, null, null);
  public cardTypes: string[];

  constructor(
    private footballerService: FootballerService,
    private clubService: ClubService,
    private cardService: CardService,
    private toastService: ToastrService,
    private updater: UpdateEmitterService
  ) {
  }

  ngOnInit() {
    this.footballerService.getFootballers().subscribe((footballers) => {
        this.footballers = footballers;
        this.homeFootballers = this.footballers.filter(ft => ft.club === this.match.homeSide);
        this.awayFootballers = this.footballers.filter(ft => ft.club === this.match.awaySide);
      },
      error => console.log(error)
    );
    this.cardService.getCardTypes().subscribe((types: string[]) => {
        this.cardTypes = types;
      },
      error => console.log(error)
    );
  }

  getFootballerName(id: number) {
    const footballer = this.footballers.find(data => {
      return data.id === id;
    });
    return footballer.name + ' ' + footballer.surname;
  }

  setCardCandidate(side: string) {
    if (side === 'HOME') {
      this.formFootballers = this.homeFootballers;
    } else if (side === 'AWAY') {
      this.formFootballers = this.awayFootballers;
    }
    this.willUpdate = false;
    this.cardCandidate = new Card(null, null, this.match.id, null, side, null, null);
  }

  setCardCandidateToUpdate(card: Card) {
    this.willUpdate = true;
    if (card.side === 'HOME') {
      this.formFootballers = this.homeFootballers;
    } else if (card.side === 'AWAY') {
      this.formFootballers = this.awayFootballers;
    }
    this.cardCandidate = card;
  }

  onSubmit() {
    console.log(this.cardCandidate);
    if (this.willUpdate) {
      this.cardService.updateCard(this.cardCandidate).subscribe(
        data => {
          this.updater.updateMatches();
          this.updater.updateCards();
          this.updater.updateGoals();
          this.toastService.success('Zmieniono kartkę', 'Poszły łapówki');
        },
        error => this.toastService.error(error.message, 'Błąd!')
      );
    } else {
      this.cardService.addCard(this.cardCandidate).subscribe(
        data => {
          this.updater.updateMatches();
          this.updater.updateCards();
          this.updater.updateGoals();
          this.toastService.success('Dodano kartke', 'Ukarany!');
        },
        error => this.toastService.error(error.message, 'Błąd!')
      );
    }
  }


  removeCard(id: number) {
    this.cardService.removeCard(id).subscribe(
      data => {
        this.updater.updateMatches();
        this.updater.updateCards();
        this.toastService.success('Usunieto kartkę.', '!loooooooG');
      },
      error => this.toastService.error(error.message, 'Błąd!')
    );
  }

}
