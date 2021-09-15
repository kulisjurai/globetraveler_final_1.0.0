import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User.model';
import { DataService } from 'src/app/shared/services/common/data.service';
import { UserService } from 'src/app/shared/services/user/User.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit {
  allUsers: any = [];
  roleTypes: any = [];
  userInstance: User = new User();
  role_id: any;
  editMode = false;
  numberOfUsers: any;

  constructor(
    private users: UserService,
    private toastrService: ToastrService,
    private userService: UserService,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.userService.countUsers();
    this.userService.getRoleType().subscribe((response: any) => {
      this.roleTypes = response;
    });
    this.data.numOfUsers.subscribe((num) => {
      this.numberOfUsers = num;
    });
  }

  getAllUsers() {
    this.users.getAllUsersService().subscribe((response: any) => {
      this.allUsers = response;
      console.log(response);
    });
  }

  deleteUser(body: any) {
    this.users.deleteUser(body).subscribe((response: any) => {
      this.toastrService.success(response.msg);
      this.getAllUsers();
      this.userService.countUsers();
    });
  }

  registerChange(ev: any) {
    console.log(ev);
  }

  // updateRoleChange(user_id: any, role_id: any) {
  //   console.log(user_id, role_id);
  //   this.users.editUser({ user_id, role_id }).subscribe((response: any) => {
  //     this.toastrService.success(response.msg);
  //     this.getAllUsers();
  //   });
  // }

  updateUser(user: any) {
    console.log(user);
    this.editMode = true;
    this.userInstance = { ...user };
  }

  saveUserChange() {
    console.log(this.userInstance);
    this.userService.editUser(this.userInstance).subscribe((response) => {
      this.toastrService.success('Uloga je izmjenjena');
      this.getAllUsers();
      this.editMode = false;
    });
  }
}
