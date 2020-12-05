import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClubService} from '../../../services/club.service';
import {Club} from '../../../models/club.model';

@Component({
  selector: 'app-team-picker',
  templateUrl: './team-picker.component.html',
  styleUrls: ['./team-picker.component.css']
})
export class TeamPickerComponent implements OnInit {


  clubs: Club[];

  @Input()
  id: string;

  @Input()
  placeholder: string;

  @Input()
  value: number;

  @Output()
  valueChanged = new EventEmitter<number>();

  valueCandidate: number;

  teamDescriptor: string;

  select(i: number) {
    this.valueCandidate = i;
  }

  constructor(private clubService: ClubService) { }

  ngOnInit() {
    this.valueCandidate = this.value;
    this.clubService.getClubs().subscribe(clubs => {
      this.clubs = clubs;
      this.save();
    }, error => console.log(error));

  }

  save() {
    this.value = this.valueCandidate;

    const team = this.clubs.find(club => club.id === this.valueCandidate);

    this.valueChanged.emit(this.value);

    if (team !== undefined) {
      this.teamDescriptor = team.name + ' ' + team.city + ' (' + team.country + ')';
    }


  }
}
