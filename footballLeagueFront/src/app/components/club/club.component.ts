import {Component, OnInit} from '@angular/core';
import {ClubService} from '../../services/club.service';
import {Router} from '@angular/router';
import {UpdateEmitterService} from '../../services/update-emitter.service';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {Club} from '../../models/club.model';


@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {

  public clubs: Club [];
  private sub: Subscription;

  constructor(private clubService: ClubService, private updateService: UpdateEmitterService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.sub = this.clubService.getClubs().subscribe(
      (data: Club[]) => {
        this.clubs = data;
        this.clubs.sort(((a, b) => a.id - b.id));
      },
      error => this.toastr.warning(error.message, 'Warning!')
    );
    this.updateService.clubsUpdate.subscribe(
      data => {
        this.sub.unsubscribe();
        this.sub = this.clubService.getClubs().subscribe(
          (data: Club[]) => {
            this.clubs = data;
            this.clubs.sort(((a, b) => a.id - b.id));
          },
          error => this.toastr.warning(error.message, 'Warning!')
        );
      }
    );
  }

  removeClub(index: number) {
    this.clubService.removeClub(this.clubs[index].id).subscribe(
      data => {
        this.clubs.splice(index, 1);
        this.toastr.success('Usunięto klub', 'Success!');
      },
      error => this.toastr.error(error.message, 'Error!')
    );
  }

}
