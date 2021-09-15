import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/services/common/data.service';
import { ReservationService } from 'src/app/shared/services/reservation/reservation.service';
import { UserService } from 'src/app/shared/services/user/User.service';
import { RegistrationValidators } from 'src/app/shared/services/validators/registration.validators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any;
  reservations: any;
  infoActive: boolean = false;
  backDrop: boolean = false;
  checkInBackdrop: boolean = false;
  cancelId: any;
  checkInId: any;
  activeReservations: any;
  public innerWidth: any;
  isWide: boolean = true;
  checked: number = 0;
  editMode: boolean = false;
  errors: any;

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      RegistrationValidators.cannotContainSpace,
    ]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    telefon: new FormControl(),
  });

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.innerWidth < 1150 ? (this.isWide = false) : (this.isWide = true);
  }
  constructor(
    private reservationService: ReservationService,
    private toastrService: ToastrService,
    private data: DataService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.innerWidth < 800) {
      this.isWide = false;
    }
    this.getUser();
    this.getAllReservationsByUserId();
    this.reservationService.getNotCanceledReservationsByUserId(
      this.user?.user_id
    );
    this.reservationService.getCheckedReservationsByUserId(this.user?.user_id);
    this.getActiveReservations();
    setInterval(() => {
      this.filterReservationById();
    }, 100);
  }

  get username() {
    return this.form.get('username');
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }
  get email() {
    return this.form.get('email');
  }

  get address() {
    return this.form.get('address');
  }

  get password() {
    return this.form.get('password');
  }

  get telefon() {
    return this.form.get('telefon');
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  toggleInfo() {
    this.infoActive = !this.infoActive;
  }

  toggleBackdrop() {
    this.backDrop = true;
  }

  toggleCheckInBackdrop() {
    this.checkInBackdrop = true;
  }

  cancelReservation() {
    this.reservationService
      .cancelReservation(this.cancelId)
      .subscribe((respone) => {
        this.toastrService.info('Rezervacija je otkazana');
        this.getAllReservationsByUserId();
      });
    this.backDrop = false;
    this.reservationService.getNotCanceledReservationsByUserId(
      this.user?.user_id
    );
    this.getActiveReservations();
  }

  getId(id: any) {
    this.cancelId = id;
    this.toggleBackdrop();
  }

  getCheckId(id: any) {
    this.checkInId = id;
    this.toggleCheckInBackdrop();
  }

  getAllReservationsByUserId() {
    this.reservationService
      .getAllReservationsByUserId(this.user.user_id)
      .subscribe((response: any) => {
        this.reservations = response;
      });
  }

  filterReservationById() {
    this.checked = 0;
    for (let i = 0; i < this.reservations.length; i++) {
      if (
        this.reservations[i].is_checked == 'TRUE' &&
        this.reservations[i].reservation_is_canceled == 'FALSE'
      ) {
        this.checked++;
      }
    }
  }

  getActiveReservations() {
    this.data.numOfNotCanceled.subscribe((response: any) => {
      this.activeReservations = response;
    });
  }
  // checkedCheck() {
  //   this.data.numOfCheckedReservations.subscribe((response) => {
  //     this.checked = response;
  //   });
  // }

  checkIn() {
    this.reservationService
      .checkInReservation(this.checkInId)
      .subscribe((result: any) => {
        this.toastrService.success(result.msg);
        this.reservationService.getCheckedReservationsByUserId(
          this.user?.user_id
        );

        this.getActiveReservations();
        this.getAllReservationsByUserId();
        this.filterReservationById();
        this.checkInBackdrop = false;
      });
  }

  toggleEditMode() {
    this.editMode = true;
    this.form.patchValue({
      username: this.user.username,
      firstName: this.user.first_name,
      lastName: this.user.last_name,
      address: this.user.address,
      telefon: this.user.telefon,
    });
  }

  validationCheck() {
    if (this.username?.errors?.minlength) {
      this.toastrService.info('Username mora biti duži od 6 karaktera.');
      return;
    } else {
    }
    if (this.username?.errors?.cannotContainSpace) {
      this.toastrService.info('Username ne smije sadržavati prazan prostor.');
      return;
    }
    if (this.username?.touched && this.username?.invalid) {
      this.toastrService.info(
        'Username je obavezno polje. Molimo popunite polje'
      );
      return;
    }
    if (this.firstName?.touched && this.firstName?.invalid) {
      this.toastrService.info(
        'Lično ime je obavezno polje. Molimo popunite polje.'
      );
      return;
    }
    if (this.lastName?.touched && this.lastName?.invalid) {
      this.toastrService.info(
        'Prezime je obavezno polje. Molimo popunite polje.'
      );
      return;
    }
    if (this.address?.touched && this.address?.invalid) {
      this.toastrService.info(
        'Adresa je obavezno polje. Molimo popunite polje'
      );
      return;
    }
  }

  saveChanges() {
    this.userService
      .updateUser({
        id: this.user.user_id,
        username: this.username?.value,
        firstName: this.firstName?.value,
        lastName: this.lastName?.value,
        address: this.address?.value,
        telefon: this.telefon?.value,
      })
      .subscribe(
        (result: any) => {
          this.toastrService.success(result.msg);
          this.editMode = false;
          localStorage.removeItem('user');
          this.userService
            .getUserById(this.user.user_id)
            .subscribe((result) => {
              this.user = result;
              this.setRefreshedUserIntoStorage(this.user);
            });

          this.getUser();
        },
        (error: any) => {
          this.errors = error;
          if (this.errors) {
            console.log(this.errors.error.msg);
            this.toastrService.error(this.errors.error.msg);
          }
        }
      );
  }

  sendRequest() {
    this.userService.checkIfUserExist(this.user?.username).subscribe(
      (result) => {
        this.toastrService.info(
          'Link za promjenu vašeg vašeg passworda poslan je na Vašu email adresu'
        );
      },
      (error: any) => {
        this.errors = error;

        if (this.errors) {
          console.log(this.errors.error.msg);
          this.toastrService.error(this.errors.error.msg);
        }
      }
    );
  }

  setRefreshedUserIntoStorage(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
