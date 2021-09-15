import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/common/data.service';
import { DestinationService } from 'src/app/shared/services/destinations/destination.service';
@Component({
  selector: 'app-reservations',
  templateUrl: './discoverBih.component.html',
  styleUrls: ['./discoverBih.component.scss'],
})
export class DiscoverBihComponent implements OnInit {
  allDestinationsArray: any[] = [];
  filterdeBihArray: any[] = [];
  splitedBihArray1: any[] = [];
  splitedBihArray2: any[] = [];

  constructor(
    public destinationService: DestinationService,
    private router: Router,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.getAllDestination();
    setTimeout(() => {
      this.filterBih();
      this.splitedBihArray1 = this.filterdeBihArray.slice(0, 3);
      this.splitedBihArray2 = this.filterdeBihArray.slice(3, 6);
    }, 50);
  }

  getAllDestination() {
    this.destinationService.getAllDestinations().subscribe((result: any) => {
      this.allDestinationsArray = result;
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

  filterBih() {
    for (let i = 0; i < this.allDestinationsArray.length; i++) {
      if (this.allDestinationsArray[i].country == 'Bosna i Hercegovina') {
        this.filterdeBihArray.push(this.allDestinationsArray[i]);
      }
    }
  }
}
