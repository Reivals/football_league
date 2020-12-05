import { Component, OnInit } from '@angular/core';
import {Match} from '../../models/match.model';
import {Club} from '../../models/club.model';
import {Goal} from '../../models/goal.model';
import {MatchService} from '../../services/match.service';
import {ClubService} from '../../services/club.service';
import {GoalService} from '../../services/goal.service';
import {UpdateEmitterService} from '../../services/update-emitter.service';


@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  public matches: Match[];
  private clubs: Club[];
  private goals: Goal[];

  constructor(
    private matchService: MatchService,
    private clubService: ClubService,
    private goalService: GoalService,
    private updater: UpdateEmitterService
  ) { }

  ngOnInit() {

    this.matchService.getMatches().subscribe(
      matches => {
        this.clubService.getClubs().subscribe(
          clubs => {
            this.goalService.getGoals().subscribe(
              goals => {
                this.clubs = clubs;
                this.goals = goals;
                this.matches = matches;
                console.log(this.matches)
              },
              error => console.log(error)
            );
          },
          error => console.log(error)
        );
      },
      error => console.log(error)
    );

    this.updater.matchesUpdate.subscribe(
      e => {
        this.matchService.getMatches().subscribe(
          matches => {
            this.clubService.getClubs().subscribe(
              clubs => {
                this.goalService.getGoals().subscribe(
                  goals => {
                    this.clubs = clubs;
                    this.goals = goals;
                    this.matches = matches;
                    console.log(this.matches)
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
    );

  }


  getClub(id: number) {
    return this.clubs.find( club => {
      return club.id === id;
    });
  }

  getGoal(id: number) {
    return this.goals.find( goal => {
      return goal.id === id;
    });
  }


  getGoals(match: Match) {
    const result = {AWAY: [], HOME: []};
    if(match.goals) {
      for (const x of match.goals) {
        result[x.side].push(x);
      }
      return result;
    } else {
      return result;
    }

  }


  getResultString(match: Match) {
    const result = this.getGoals(match);
    return result.HOME.length + ':' + result.AWAY.length;
  }



}
