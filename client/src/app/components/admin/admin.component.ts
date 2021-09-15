import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/common/data.service';
import { DestinationService } from 'src/app/shared/services/destinations/destination.service';
import { ReservationService } from 'src/app/shared/services/reservation/reservation.service';
import { UserService } from 'src/app/shared/services/user/User.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  activePanel: string = 'reservations';
  formState: boolean = false;

  countReservations: any;

  constructor(
    private data: DataService,
    private counter: DestinationService,
    private userCounter: UserService,
    private reservationService: ReservationService
  ) {}

  ngOnInit() {
    this.reservationService.countReservations();
    this.data.numOfReservations.subscribe((response) => {
      console.log('ngONINIT', response);
      this.countReservations = response;
      console.log('ngONINIT', this.countReservations);
    });
    this.counter.countDestinations();

    this.userCounter.countUsers();
  }

  toggleForm() {
    this.data.updateAddDestinationFormStatus(true);
  }

  formOff() {
    this.data.updateAddDestinationFormStatus(false);
  }

  display() {
    console.log('admin-main', this.countReservations);
  }
}
