import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/common/data.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  isSearchActive: any;
  isSignUpFormActive: any;
  public innerWidth: any;
  public isWide: boolean = true;

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.innerWidth < 985 ? (this.isWide = false) : (this.isWide = true);
  }

  toggleSearch(status?: any) {
    if (status) {
      this.data.updateStatus(false);
    }
    this.data.updateStatus(!this.isSearchActive);
  }
  toggleSignUpForm(status?: any) {
    if (status) {
      this.data.updateSignIpFormStatus(false);
    }
    this.data.updateSignIpFormStatus(!this.isSignUpFormActive);
  }
}
