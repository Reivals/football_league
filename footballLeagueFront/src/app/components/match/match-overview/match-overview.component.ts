import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Match} from '../../../models/match.model';
import {Goal} from '../../../models/goal.model';
import {Club} from '../../../models/club.model';
import {MatchService} from '../../../services/match.service';
import {ClubService} from '../../../services/club.service';
import {GoalService} from '../../../services/goal.service';
import {ToastrService} from 'ngx-toastr';
import {UpdateEmitterService} from '../../../services/update-emitter.service';


@Component({
  selector: 'app-match-overview',
  templateUrl: './match-overview.component.html',
  styleUrls: ['./match-overview.component.css']
})
export class MatchOverviewComponent implements OnInit {

  public match: Match = new Match(null, null, null, null, null, null, null);
  public goals: Goal[];


  public homeClub: Club;
  public awayClub: Club;

  public matchGoals = {HOME: [], AWAY: []};
  public matchCards = {HOME: [], AWAY: []};


  constructor(
    private route: ActivatedRoute,
    private matchService: MatchService,
    private clubService: ClubService,
    private goalService: GoalService,
    private toastService: ToastrService,
    private updaterService: UpdateEmitterService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id != null) {
        this.matchService.getMatch(params.id).subscribe(
          match => {
            this.clubService.getClubs().subscribe(
              clubs => {
                this.goalService.getGoals().subscribe(
                  goals => {
                    this.homeClub = clubs.find(club => {
                      return club.id === match.homeSide;
                    });

                    this.awayClub = clubs.find(club => {
                      return club.id === match.awaySide;
                    });

                    this.goals = goals;
                    this.matchGoals = this.getGoals(match);
                    this.matchCards = this.getCards(match);
                    this.match = match;
                  },
                  error => console.log(error)
                );
              },
              error => console.log(error)
            );

          },
          error => console.log(error)
        );
      }
    });

    this.updaterService.goalsUpdate.subscribe(
      () => {
        this.route.params.subscribe(params => {
          if (params.id != null) {
            this.matchService.getMatch(params.id).subscribe(
              match => {
                this.clubService.getClubs().subscribe(
                  clubs => {
                    this.goalService.getGoals().subscribe(
                      goals => {
                        this.homeClub = clubs.find(club => {
                          return club.id === match.homeSide;
                        });

                        this.awayClub = clubs.find(club => {
                          return club.id === match.awaySide;
                        });

                        this.goals = goals;
                        this.matchGoals = this.getGoals(match);
                        this.matchCards = this.getCards(match);
                        this.match = match;
                      },
                      error => console.log(error)
                    );
                  },
                  error => console.log(error)
                );

              },
              error => console.log(error)
            );
          }
        });
      }
    );


  }

  getGoals(match: Match) {
    const result = {AWAY: [], HOME: []};
    if (match.goals) {
      for (const x of match.goals) {
        result[x.side].push(x);
      }
    }

    result.AWAY.sort((a, b) => (a.goalMinute - b.goalMinute));
    result.HOME.sort((a, b) => (a.goalMinute - b.goalMinute));
    return result;
  }

  getCards(match: Match) {
    const result = {AWAY: [], HOME: []};
    if (match.cards) {
      for (const x of match.cards) {
        result[x.side].push(x);
      }
    }
    result.AWAY.sort((a, b) => (a.goalMinute - b.goalMinute));
    result.HOME.sort((a, b) => (a.goalMinute - b.goalMinute));
    return result;
  }

  getResultString() {
    return this.matchGoals.HOME.length + ':' + this.matchGoals.AWAY.length;
  }

  removeMatch() {
    this.matchService.removeMatch(this.match.id).subscribe(
      answer => {
        this.toastService.success('Usunięto', 'Wszystko ok');
        this.updaterService.updateMatches();
        this.router.navigateByUrl('/matches');
      },
      error => this.toastService.error(error, 'To nie zadziałało')
    );
  }


}
