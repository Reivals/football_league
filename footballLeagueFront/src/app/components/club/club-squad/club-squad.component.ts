import {Component, OnInit} from '@angular/core';
import {Footballer} from '../../../models/footballer.model';
import {ClubService} from '../../../services/club.service';
import {ActivatedRoute} from '@angular/router';
import {FootballerService} from '../../../services/footballer.service';


@Component({
  selector: 'app-club-squad',
  templateUrl: './club-squad.component.html',
  styleUrls: ['./club-squad.component.css'],
})
export class ClubSquadComponent implements OnInit {

  public footballers: Footballer[];

  constructor(private route: ActivatedRoute, private footballerService: FootballerService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.footballerService.getFootballers().subscribe(data => {
        this.footballers = data.filter(f => f.club == params['id']);
      });
    });
  }


}
