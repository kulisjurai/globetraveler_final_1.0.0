import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/services/common/data.service';
import { DestinationService } from 'src/app/shared/services/destinations/destination.service';
import { ReservationService } from 'src/app/shared/services/reservation/reservation.service';
import { UserService } from 'src/app/shared/services/user/User.service';

@Component({
  selector: 'reservation-formular',
  templateUrl: './reservation-formular.component.html',
  styleUrls: ['./reservation-formular.component.scss'],
})
export class ReservationFormularComponent implements OnInit {
  destInfo: any;
  images: any[] = [];
  errors: any;
  user: any;
  privacyPolicyCheck: boolean = false;
  id: any;
  doubleExist: boolean = false;
  allReservations: any[] = [];
  private paymentType: number = 1;

  constructor(
    private data: DataService,
    private userSercive: UserService,
    private reservationService: ReservationService,
    private toastrService: ToastrService,
    private router: Router,
    private destinationService: DestinationService
  ) {}
  showNavigationIndicators = true;

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('id') || '{}');
    this.user = this.userSercive.getUser();
    this.destinationService.getDestinationById(this.id);
    this.data.destinationInfo.subscribe((result: any) => {
      this.destInfo = result;
    });
  }

  reserveDestination() {
    this.reservationService
      .getAllReservationsByUserId(this.user.user_id)
      .subscribe((result: any) => {
        this.allReservations = result;
        for (let i = 0; i < this.allReservations.length; i++) {
          if (this.destInfo.dest_id == this.allReservations[i].destination_id) {
            this.doubleExist = true;
            break;
          }
        }
      });
    setTimeout(() => {
      if (this.doubleExist) {
        this.toastrService.info(
          `Rezervacija već postoji. Nije moguće više puta rezervirati istu destinaciju`
        );
      } else {
        console.log('else', this.doubleExist);
        this.reservationService
          .createReservationService({
            user_id: this.user.user_id,
            destination_id: this.destInfo.dest_id,
            transport_id: this.destInfo.transport_id,
            payment_type_id: this.paymentType,
          })
          .subscribe(
            (response: any) => {
              this.toastrService.success(response.msg);

              this.dispatchToProfile();
            },
            (error: any) => {
              this.errors = error;
              if (this.errors) {
                console.log(this.errors.error.msg);
                this.toastrService.error(
                  `${this.errors.error.msg}. Rezervacija nije uspjela, molimo pokušajte poslije`
                );
              }
            }
          );
      }
    }, 500);
  }

  dispatchToProfile() {
    this.router.navigateByUrl('profile');
  }

  checkCheckBoxvalue(event: any) {
    if (!event.target.checked) {
      this.privacyPolicyCheck = false;
    } else {
      this.privacyPolicyCheck = true;
    }
  }

  sendPaymentType(ev: any) {
    this.paymentType = ev.target.value;
  }
}
