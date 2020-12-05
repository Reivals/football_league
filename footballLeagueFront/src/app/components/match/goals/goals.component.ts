import {Component, Input, OnInit} from '@angular/core';
import {Match} from '../../../models/match.model';
import {Goal} from '../../../models/goal.model';
import {Footballer} from '../../../models/footballer.model';
import {FootballerService} from '../../../services/footballer.service';
import {ClubService} from '../../../services/club.service';
import {ToastrService} from 'ngx-toastr';
import {UpdateEmitterService} from '../../../services/update-emitter.service';
import {GoalService} from '../../../services/goal.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {


  @Input() match: Match;
  @Input() homeGoals: Goal[];
  @Input() awayGoals: Goal[];

  public willUpdate = false;

  public footballers: Footballer[];

  private homeFootballers: Footballer[];
  private awayFootballers: Footballer[];

  public formFootballers: Footballer[] = [];

  public goalCandidate: Goal = new Goal(null, null, null, null, null);

  constructor(
    private footballerService: FootballerService,
    private clubService: ClubService,
    private goalService: GoalService,
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
  }

  getFootballerName(id: number) {
    const footballer = this.footballers.find(data => {
      return data.id === id;
    });
    return footballer.name + ' ' + footballer.surname;
  }

  setGoalCandidate(side: string) {
    if (side === 'HOME') {
      this.formFootballers = this.homeFootballers;
    } else if (side === 'AWAY') {
      this.formFootballers = this.awayFootballers;
    }
    this.willUpdate = false;
    this.goalCandidate = new Goal(null, null, this.match.id, null, side);
  }

  setGoalCandidateToUpdate(goal: Goal) {
    this.willUpdate = true;
    if (goal.side === 'HOME') {
      this.formFootballers = this.homeFootballers;
    } else if (goal.side === 'AWAY') {
      this.formFootballers = this.awayFootballers;
    }
    this.goalCandidate = goal;
  }

  onSubmit() {
    console.log(this.goalCandidate);
    if (this.willUpdate) {
      this.goalService.updateGoal(this.goalCandidate).subscribe(
        data => {
          this.updater.updateMatches();
          this.updater.updateGoals();
          this.toastService.success('Pozmieniano gole', 'Poszły łapówki');
        },
        error => this.toastService.error(error.message, 'Błąd!')
      );
    } else {
      this.goalService.addGoal(this.goalCandidate).subscribe(
        data => {
          this.updater.updateMatches();
          this.updater.updateGoals();
          this.toastService.success('Dodano gola', 'Goooool!');
        },
        error => this.toastService.error(error.message, 'Błąd!')
      );
    }
  }


  removeGoal(id: number) {
    this.goalService.removeGoal(id).subscribe(
      data => {
        this.updater.updateMatches();
        this.updater.updateGoals();
        this.toastService.success('i już nie ma gola.', '!loooooooG');
      },
      error => this.toastService.error(error.message, 'Błąd!')
    );
  }

}
