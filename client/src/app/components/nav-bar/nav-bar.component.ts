import { Component, OnInit, Output } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/services/common/data.service';
import { UserService } from 'src/app/shared/services/user/User.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public innerWidth: any;
  public isWide: boolean = true;
  isBurgerActive: any;
  isSearchActive: any;
  isSignUpFormActive: any = false;
  isLoginActive: any = false;
  alternativeUser: any;

  constructor(
    private data: DataService,
    public userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1150) {
      this.isWide = false;
    }
    this.data.searchStatus.subscribe((status) => {
      this.isSearchActive = status;
    });
    this.data.burgerStatus.subscribe((status) => {
      this.isBurgerActive = status;
    });
    this.data.signUpFormStatus.subscribe((status) => {
      this.isSignUpFormActive = status;
    });
    this.data.loginStatus.subscribe((status) => {
      this.isLoginActive = status;
    });
    //this.alternativeUser = JSON.parse('user') || '{}';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.innerWidth < 1150 ? (this.isWide = false) : (this.isWide = true);
  }

  //toggle burger
  toggle() {
    this.data.updateBurgerStatus(!this.isBurgerActive);
  }

  toggleSearch(status?: any) {
    if ((status = false)) {
      this.data.updateStatus(true);
    } else if (status == 'steady') {
      this.data.updateStatus(!this.isSearchActive);
    } else {
      this.data.updateStatus(false);
    }
  }

  toggleSignUpForm(status?: any) {
    if (status) {
      this.data.updateSignIpFormStatus(false);
    }
    this.data.updateSignIpFormStatus(!this.isSignUpFormActive);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.data.updateLoginStatus(!this.isLoginActive);
    this.toastrService.info('Uspješno ste se odjavili');
    this.router.navigateByUrl('home');
  }
}
