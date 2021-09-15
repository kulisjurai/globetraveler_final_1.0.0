import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  goingUp: boolean = true;
  oldValue: any = window.pageYOffset;
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  @HostListener('window:scroll', ['$event'])
  doSomething(event: any) {
    if (window.pageYOffset <= this.oldValue) {
      this.goingUp = true;
      this.oldValue = window.pageYOffset;
    } else if (window.pageYOffset >= this.oldValue && window.pageYOffset > 30) {
      this.goingUp = false;
      this.oldValue = window.pageYOffset;
    }
  }
}
