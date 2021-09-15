import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/services/common/data.service';
import { ReservationService } from 'src/app/shared/services/reservation/reservation.service';

@Component({
  selector: 'app-admin-reservations',
  templateUrl: './admin-reservations.component.html',
  styleUrls: ['./admin-reservations.component.scss'],
})
export class AdminReservationsComponent implements OnInit {
  allReservations: any[] = [];
  activeReservations: any[] = [];
  canceledReservations: number = 0;
  checkedInReservations: number = 0;
  constructor(
    private reservationService: ReservationService,
    private toastrService: ToastrService,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.getAllReservations();
    this.reservationService.getAllReservations();
    this.reservationService.countReservations();
    setTimeout(() => {
      this.filterNumber();
    }, 100);
  }

  getAllReservations() {
    this.reservationService.getAllReservations().subscribe((response: any) => {
      this.allReservations = response;
    });
  }
  filterNumber() {
    this.checkedInReservations = 0;
    for (let i = 0; i < this.allReservations.length; i++) {
      if (
        this.allReservations[i].is_checked == 'TRUE' &&
        this.allReservations[i].reservation_is_canceled == 'FALSE'
      ) {
        this.checkedInReservations++;
      }
    }
    this.canceledReservations = 0;
    for (let i = 0; i < this.allReservations.length; i++) {
      if (this.allReservations[i].reservation_is_canceled == 'TRUE') {
        this.canceledReservations++;
      }
    }

    console.log('filtered', this.canceledReservations);
  }

  deleteReservation(id: any) {
    this.reservationService.deleteReservation(id).subscribe((respone) => {
      this.toastrService.warning('Rezervacija je izbrisana');
      this.getAllReservations();
      this.reservationService.countReservations();
    });
  }

  cancelReservation(id: any) {
    this.reservationService.cancelReservation(id).subscribe((respone) => {
      this.toastrService.warning('Rezervacija je otkazana');
      this.getAllReservations();
      setTimeout(() => {
        this.filterNumber();
      }, 100);
    });
  }

  restoreReservation(id: any) {
    this.reservationService.restoreReservation(id).subscribe((respone) => {
      this.toastrService.success('Rezervacija je vraćena');
      this.getAllReservations();
      setTimeout(() => {
        this.filterNumber();
      }, 100);
    });
  }

  check() {
    console.log('check', this.allReservations);
  }

  formatDate() {
    for (let i = 0; i < this.allReservations.length; i++) {}
  }
}
