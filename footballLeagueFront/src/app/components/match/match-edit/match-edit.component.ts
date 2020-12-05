import {Component, Input, OnInit} from '@angular/core';

import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {Match} from '../../../models/match.model';
import {UpdateEmitterService} from '../../../services/update-emitter.service';
import {MatchService} from '../../../services/match.service';


@Component({
  selector: 'app-match-add',
  templateUrl: './match-edit.component.html',
  styleUrls: ['./match-edit.component.css']
})
export class MatchEditComponent implements OnInit {

  public match: Match = new Match(null, null, null, null, null, null, null);

  public matchResults: string[];

  public addMode;


  constructor(
    private matchService: MatchService,
    private toastService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private updater: UpdateEmitterService
  ) { }

  ngOnInit() {
    this.matchService.getMatchResults().subscribe(
      value => this.matchResults = value,
      error => console.log(error)
    );
    this.addMode = this.router.url.includes('add');

    if (!this.addMode) {
      this.route.params.subscribe(params => {
        if (params.id != null) {
          this.matchService.getMatch(params.id).subscribe(data => {
              console.log(data);
              this.match = data;
            },
            error => console.log(error));
        }
      });
    }
  }

  onSubmit() {
    if (this.match.result === '') {
      this.match.result = null;
    }
    if (this.addMode) {
      this.matchService.addMatch(this.match).subscribe(
        data => {
          this.updater.updateMatches();
          this.toastService.success('Dodano mecz', 'Śmiga jak rakieta!');
          this.router.navigate(['..'], {relativeTo: this.route});
        },
        error => this.toastService.error(error.message, 'Błąd!')
      );
    } else {
      console.log(this.match);
      this.matchService.updateMatch(this.match).subscribe(
        data => {
          this.updater.updateMatches();
          this.toastService.success('Zmodyfikowano mecz', 'Śmiga jak szerszeń!');
          this.router.navigate(['..'], {relativeTo: this.route});
        },
        error => this.toastService.error(error.message, 'Błąd!')
      );
    }
  }

  assignToHomeSideId( event: number) {
    this.match.homeSide = event;
  }
  assignToAwaySideId( event: number) {
    this.match.awaySide = event;
  }
}
