import {Component, Input, OnInit} from '@angular/core';
import {Club} from '../../../models/club.model';

@Component({
  selector: 'app-team',
  template: '<div><h3>{{team.name}}</h3></div>\n' +
    '<div><h5>{{team.city}}</h5></div>\n' +
    '<div><h6>{{team.country}}</h6></div>'
})
export class TeamComponent implements OnInit {

  @Input()
  public team: Club;

  constructor() { }

  ngOnInit() {
  }

}
