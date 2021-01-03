import {Component, Input, OnInit} from '@angular/core';
import {Match} from '../../../models/match.model';
import {Footballer} from '../../../models/footballer.model';
import {FootballerService} from '../../../services/footballer.service';
import {ClubService} from '../../../services/club.service';
import {ToastrService} from 'ngx-toastr';
import {UpdateEmitterService} from '../../../services/update-emitter.service';
import {Card} from '../../../models/card.model';
import {CardService} from '../../../services/card.service';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';


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

  public footballers: Footballer[] = [];
  private homeFootballers: Footballer[] = [];
  private awayFootballers: Footballer[] = [];

  public formFootballers: Footballer[] = [];

  public cardCandidate: Card = new Card(null, null, null, null, null, null, null);
  public cardTypes: string[];
  public cardForm: FormGroup;

  constructor(
    private footballerService: FootballerService,
    private clubService: ClubService,
    private cardService: CardService,
    private toastService: ToastrService,
    private updater: UpdateEmitterService
  ) {
    this.cardForm = this.createFormGroup();
  }

  ngOnInit() {
    this.footballerService.getFootballers().subscribe((footballers) => {
        this.footballers = footballers;
        this.footballers.filter(ft => {
          if (ft.club === this.match.homeSide) {
            this.homeFootballers.push(ft);
          } else if (ft.club === this.match.awaySide) {
            this.awayFootballers.push(ft);
          }
        });
      },
      error => console.log(error)
    );
    this.cardService.getCardTypes().subscribe((types: string[]) => {
        this.cardTypes = types;
      },
      error => console.log(error)
    );
  }

  createFormGroup() {
    return new FormGroup({
      matchMinute: new FormControl('', [Validators.required]),
      footballer: new FormControl('', [Validators.required]),
      cardType: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required])
    });
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
    this.cardCandidate.minute = this.cardForm.get('matchMinute').value;
    this.cardCandidate.type = this.cardForm.get('cardType').value;
    this.cardCandidate.reason = this.cardForm.get('reason').value;
    this.cardCandidate.footballer = this.cardForm.get('footballer').value;
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
