import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { UserService } from '../user/User.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardAdminService implements CanActivate {
  constructor(
    private userService: UserService,
    private notifications: ToastrService,
    private router: Router
  ) {}

  canActivate(route: any, state: RouterStateSnapshot) {
    if (!this.userService.isAuthenticated()) {
      this.notifications.error('You need to be authenticated.');
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    } else if (!this.userService.isAdministrator()) {
      this.notifications.error('You need to be administrator.');
      this.router.navigateByUrl('/home');
      return false;
    }

    return true;
  }
}
