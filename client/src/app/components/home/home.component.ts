import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/common/data.service';
import { DestinationService } from 'src/app/shared/services/destinations/destination.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allDestinationsArray: any[] = [];
  firstHalf: any[] = [];
  secondHalf: any[] = [];

  splitedArray: any;

  constructor(
    public destinationService: DestinationService,
    private router: Router,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.getAllDestination();
  }

  getAllDestination() {
    this.destinationService.getAllDestinations().subscribe((result: any) => {
      this.allDestinationsArray = result;
      this.firstHalf = this.allDestinationsArray.slice(0, 6);
      this.secondHalf = this.allDestinationsArray.slice(6, 9);
    });
  }

  openFullInformation() {
    this.router.navigateByUrl('full-info');
  }

  getParsingFunction(id: any) {
    this.destinationService.parseDestinationProgram(id);
    this.data.updateInfoSource(id);
    localStorage.setItem('id', id);
  }
}
