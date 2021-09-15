import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { environment } from 'src/environments/environment';
import { DataService } from '../common/data.service';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  constructor(private http: HttpClient, private data: DataService) {}

  createReservationService(reservationBody: any) {
    return this.http.post(
      `${environment.serverUrl}/reservation-create`,
      reservationBody
    );
  }

  getAllReservations() {
    return this.http.get(`${environment.serverUrl}/get-all-reservations`);
  }

  deleteReservation(id: any) {
    return this.http.put(
      environment.serverUrl + '/reservation-delete/' + parseInt(id),
      { id }
    );
  }

  cancelReservation(id: any) {
    return this.http.put(
      environment.serverUrl + '/reservation-cancel/' + parseInt(id),
      { id }
    );
  }

  restoreReservation(id: any) {
    return this.http.put(
      environment.serverUrl + '/reservation-restore/' + parseInt(id),
      { id }
    );
  }

  countReservations() {
    this.http
      .get(environment.serverUrl + '/reservations-count')
      .subscribe((success: any) => {
        this.data.updateReservationsCounter(success.numOfReservations);
        return success.numOfReservations;
      });
  }

  getNotCanceledReservationsByUserId(id: any) {
    return this.http
      .get(environment.serverUrl + '/reservations-not-canceled/' + id, id)
      .subscribe((success: any) => {
        this.data.upadateNotCanceledNumber(success.notCanceled);
        return success.notCanceled;
      });
  }

  getAllReservationsByUserId(id: any) {
    return this.http.get(
      environment.serverUrl + '/reservations-get-all-by-user-id/' + id
    );
  }

  getCheckedReservationsByUserId(id: any) {
    return this.http
      .get(environment.serverUrl + '/reservations-checked-by-user-id/' + id, id)
      .subscribe((success: any) => {
        this.data.upadateCheckedNumber(success.checkedReserve);
        return success.checkedReserve;
      });
  }

  checkInReservation(id: any) {
    return this.http.put(
      environment.serverUrl + '/reservation-check-in/' + parseInt(id),
      { id }
    );
  }
}
