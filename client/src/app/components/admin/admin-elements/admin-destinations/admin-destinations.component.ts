import { Component, OnInit } from '@angular/core';
import { DestinationService } from 'src/app/shared/services/destinations/destination.service';
import { Destination } from 'src/app/models/Destination.model';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/services/common/data.service';

@Component({
  selector: 'app-admin-destinations',
  templateUrl: './admin-destinations.component.html',
  styleUrls: ['./admin-destinations.component.scss'],
})
export class AdminDestinationsComponent implements OnInit {
  allDestinations: any = [];
  formState: boolean = false;
  editMode: boolean = false;
  transportTypes: any = [];
  errors: any;
  numberOfDestinations: any;
  isCounterUpdated: boolean = true;
  destination: Destination = new Destination();

  constructor(
    private getDestination: DestinationService,
    private transport: DestinationService,
    private data: DataService,
    private destinationService: DestinationService,
    private toastrService: ToastrService,
    private counter: DestinationService
  ) {}

  ngOnInit(): void {
    this.getDestinations();
    this.data.numOfDest.subscribe((result) => {
      this.numberOfDestinations = result;
    });

    this.data.addDestinationFormStatus.subscribe((status) => {
      this.formState = status;
    });

    this.transport.getTransportType().subscribe((response) => {
      this.transportTypes = response;
    });
  }

  getDestinations() {
    this.getDestination.getAllDestinations().subscribe((response) => {
      this.allDestinations = response;
    });
  }

  createDestination() {
    this.destinationService
      .createDestinationSercvice(this.destination)
      .subscribe(
        (response: any) => {
          this.toastrService.success('Destinacija uspješno dodana.');

          this.getDestinations();
          this.clear();
          this.formState = false;
          this.counter.countDestinations();
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

  deleteDestination(id: any) {
    this.destinationService.deleteDestination(id).subscribe((response: any) => {
      this.toastrService.success(response.msg);
      this.counter.countDestinations();
      this.getDestinations();
    });
  }

  editDestination(item: any) {
    this.destination = { ...item };
    this.editMode = true;
    this.formState = true;
  }

  updateDestination() {
    this.destinationService
      .updateDestination(this.destination)
      .subscribe((response: any) => {
        this.toastrService.success(response.msg);
        this.getDestinations();
      });
    this.editMode = false;
    this.formState = false;
  }

  clear() {
    this.destination = {};
  }
}
