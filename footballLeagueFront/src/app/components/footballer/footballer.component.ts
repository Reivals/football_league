import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FootballerService} from "../../services/footballer.service";
import {Subscription} from "rxjs";
import {UpdateEmitterService} from "../../services/update-emitter.service";
import {ToastrService} from "ngx-toastr";
import {Footballer} from '../../models/footballer.model';


@Component({
  selector: 'app-footballer',
  templateUrl: './footballer.component.html',
  styleUrls: ['./footballer.component.css']
})
export class FootballerComponent implements OnInit {

   public footballers: Footballer[];
   private sub: Subscription;

  constructor(private footballerService: FootballerService, private updateService: UpdateEmitterService,
              private toastr: ToastrService) { }


  ngOnInit() {
    this.sub = this.footballerService.getFootballers().subscribe(
      (data: Footballer[]) => {
        this.footballers = data;
        console.log(this.footballers);
        this.footballers.sort((a: Footballer,  b: Footballer) => a.id-b.id)
      },
      error => this.toastr.warning(error.message, "Warning!")
    );

    this.updateService.footballersUpdate.subscribe(
      data => {
        this.sub.unsubscribe();
        this.footballerService.getFootballers().subscribe(
          (data: Footballer[]) => {
            this.footballers = data;
            this.footballers.sort((a: Footballer,  b: Footballer) => a.id-b.id);
          },
          error => this.toastr.warning(error.message, "Warning!")
        );
      }
    )
  }

  removeFootballer(index: number){
    this.footballerService.removeFootballer(this.footballers[index].id).subscribe(
      data => {
        this.footballers.splice(index,1);
        this.toastr.success("Usunięto zawodnika", 'Success!');
      },
      error => this.toastr.error(error.message, "Error!")
    )
  }


}
