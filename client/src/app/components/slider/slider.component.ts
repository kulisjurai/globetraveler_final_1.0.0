import { Component, OnInit } from '@angular/core';
import { DestinationService } from 'src/app/shared/services/destinations/destination.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  fetchedData: any[] = [];
  constructor(
    private destinationService: DestinationService,
    private router: Router
  ) {}

  showNavigationIndicators = true;

  ngOnInit(): void {
    this.destinationService.getAllDestinations().subscribe((response: any) => {
      for (let i = 0; i < response.length; i++) {
        this.fetchedData.push({
          image: response[i].image1,
          name: response[i].name,
          id: response[i].dest_id,
          price: response[i].price,
        });
      }

      console.log('somephotos', this.fetchedData);
    });
  }

  detect(id: any) {
    this.destinationService.postLastVisited(id);
    this.router.navigateByUrl('full-info');
  }
}
