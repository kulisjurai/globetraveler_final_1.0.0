import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { DestinationService } from '../destinations/destination.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  numOfDestinations: any;

  constructor() {}

  //search toggler
  private searchSource = new BehaviorSubject<any>(true);
  searchStatus = this.searchSource.asObservable();

  updateStatus(status: boolean) {
    this.searchSource.next(status);
  }

  //burger toggler
  private burgerSource = new BehaviorSubject<any>(true);
  burgerStatus = this.burgerSource.asObservable();

  updateBurgerStatus(status: boolean) {
    this.burgerSource.next(status);
  }

  //signup toggler
  private signUpFormSource = new BehaviorSubject<any>(true);
  signUpFormStatus = this.signUpFormSource.asObservable();

  updateSignIpFormStatus(status: boolean) {
    this.signUpFormSource.next(status);
  }

  //loggedIn

  private loginSource = new BehaviorSubject<any>(false);
  loginStatus = this.loginSource.asObservable();

  updateLoginStatus(status: boolean) {
    this.loginSource.next(status);
  }

  //add destination form

  private addDestinationFormSource = new BehaviorSubject<any>(false);
  addDestinationFormStatus = this.addDestinationFormSource.asObservable();

  updateAddDestinationFormStatus(status: boolean) {
    this.addDestinationFormSource.next(status);
  }

  private numOfDestSource = new BehaviorSubject<any>(0);
  numOfDest = this.numOfDestSource.asObservable();

  updateCounter(num: number) {
    this.numOfDestSource.next(num);
  }

  private numOfUsersSource = new BehaviorSubject<any>(0);
  numOfUsers = this.numOfUsersSource.asObservable();

  updateUsersCounter(num: number) {
    this.numOfUsersSource.next(num);
  }

  private infoDestSource = new BehaviorSubject<any>(null);
  destinationInfo = this.infoDestSource.asObservable();

  informer(num: number) {
    this.infoDestSource.next(num);
  }

  private numOfReservationsSource = new BehaviorSubject<any>(0);
  numOfReservations = this.numOfReservationsSource.asObservable();

  updateReservationsCounter(num: number) {
    this.numOfReservationsSource.next(num);
  }

  private notCanceledReservtionsByUser = new BehaviorSubject<any>(0);
  numOfNotCanceled = this.notCanceledReservtionsByUser.asObservable();

  upadateNotCanceledNumber(num: number) {
    this.notCanceledReservtionsByUser.next(num);
  }

  private checkedReservtionsByUser = new BehaviorSubject<any>(0);
  numOfCheckedReservations = this.checkedReservtionsByUser.asObservable();

  upadateCheckedNumber(num: number) {
    this.checkedReservtionsByUser.next(num);
  }

  private parseDestinationProgramSource = new BehaviorSubject<any>(null);
  parsedProgram = this.parseDestinationProgramSource.asObservable();

  fetchParsedProgram(data: any) {
    this.parseDestinationProgramSource.next(data);
  }

  private parseDestinationProgramSource1 = new BehaviorSubject<any>({});
  parsedProgram1 = this.parseDestinationProgramSource.asObservable();

  fetchParsedProgram1(number: any) {
    this.parseDestinationProgramSource1.next(number);
  }

  private detailInfoSource = new BehaviorSubject<any>({});
  infoSource = this.detailInfoSource.asObservable();

  updateInfoSource(number: any) {
    this.detailInfoSource.next(number);
  }
}
