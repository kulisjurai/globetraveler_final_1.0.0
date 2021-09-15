import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/services/common/data.service';
import { DestinationService } from 'src/app/shared/services/destinations/destination.service';
import { ReservationService } from 'src/app/shared/services/reservation/reservation.service';
import { UserService } from 'src/app/shared/services/user/User.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  stableData: any;
  destInfo: any;
  images: any[] = [];
  errors: any;
  user: any;
  program: any;
  parsedProgram: any;
  innerWidth: any;
  isWide: boolean = true;
  photoSwitchCounter: number = 0;
  snapShot: any;
  showNavigationIndicators = true;
  idToShow: any;
  idFromStarage: any;

  constructor(
    private data: DataService,
    private router: Router,
    public destinationService: DestinationService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.innerWidth < 800 ? (this.isWide = false) : (this.isWide = true);
  }

  ngOnInit(): void {
    this.idFromStarage = JSON.parse(localStorage.getItem('id') || '{}');
    this.destinationService
      .getByIdDetails(this.idFromStarage)
      .subscribe((result) => {
        this.stableData = result;
        if (this.stableData) {
          this.photoBinder();
          setTimeout(() => {
            if (this.stableData) {
              const html = new DOMParser();
              this.parsedProgram = html.parseFromString(
                this.stableData.program,
                'text/html'
              );
              if (document.getElementById('div-parent')?.innerHTML == '')
                document
                  .getElementById('div-parent')
                  ?.appendChild(
                    this.parsedProgram.firstChild.lastChild.firstChild
                  );
            }
            if (document.getElementById('div-parent')?.innerHTML !== '') {
            }
          }, 50);
        }
      });
  }

  photoBinder() {
    this.images = [];
    for (let item in this.stableData) {
      if (item.includes('image')) {
        this.images.push(this.stableData[item]);
      }
    }
  }

  dispatchToReservationFormular() {
    this.router.navigateByUrl('reservation-confirmation');
  }

  rightClick() {
    this.photoSwitchCounter++;
    if (this.photoSwitchCounter == 3) {
      this.photoSwitchCounter = 0;
    }
  }
  leftClick() {
    this.photoSwitchCounter--;
    if (this.photoSwitchCounter == -1) {
      this.photoSwitchCounter = 2;
    }
  }
}
