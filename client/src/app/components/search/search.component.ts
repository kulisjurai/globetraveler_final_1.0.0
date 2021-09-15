import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { indexOf } from 'lodash';
import { DataService } from 'src/app/shared/services/common/data.service';
import { DestinationService } from 'src/app/shared/services/destinations/destination.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchState: any;
  closingState: any = true;
  searchingTerm: string = '';
  target: any;
  transportType: any;
  resultArray: any[] = [];
  isCountryFilterOpened: boolean = true;
  isDaysFilterOpened: boolean = false;
  isTransportFilterOpened: boolean = false;
  isPriceFilterOpened: boolean = false;
  countriesArray: any[] = [];
  switchCountryArray: any[] = [];
  switchDaysArray: any[] = [];
  switchPriceArray: any[] = [];
  switchTransportArray: any[] = [];
  filteredResult: any[] = [];

  form = new FormGroup({
    searchInput: new FormControl(''),
  });

  countryCheckBox = new FormGroup({
    countries: new FormControl(''),
  });

  constructor(
    private data: DataService,
    private destinationService: DestinationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.data.searchStatus.subscribe((status) => {
      this.searchState = status;
    });
    this.fetchingUniqueCountriesRegister();
    this.destinationService.getTransportType().subscribe((result: any) => {
      this.transportType = result;
    });
  }

  get searchInput() {
    return this.form.get('searchInput');
  }

  get countries() {
    return this.countryCheckBox.get('countries');
  }

  closingFunction() {
    this.data.updateStatus(!this.searchState);
  }

  search() {
    this.target = this.searchInput?.value.toUpperCase();
    if (!this.target) {
      this.target = '...';
      this.resultArray = [];
    }
    this.destinationService
      .searchDestinations(this.target)
      .subscribe((result: any) => {
        this.resultArray = result;
        console.log(this.resultArray);
      });
  }

  searchByClick() {}

  detect(id: any) {
    console.log(id);
  }

  openFullInformation(id: any) {
    this.destinationService.parseDestinationProgram(id);
    this.data.updateInfoSource(id);
    localStorage.setItem('id', id);
    this.router.navigateByUrl('full-info');
  }

  fetchingUniqueCountriesRegister() {
    this.destinationService
      .getUniqueCountriesRegister()
      .subscribe((result: any) => {
        this.countriesArray = result;
        console.log('coutriesArray', this.countriesArray);
      });
  }

  getValues(ev: any, param?: any) {
    let midMerged = [];

    switch (true) {
      case ev.target.id.includes('country'):
        if (ev.target.checked) {
          this.switchCountryArray.push(
            `country = "${param}" AND is_active = "ACTIVE"`
          );
        } else {
          this.switchCountryArray.splice(
            this.switchCountryArray.indexOf(
              `country = "${param}" AND is_active = "ACTIVE"`
            ),
            1
          );
        }
        break;
      case ev.target.id.includes('days'):
        if (ev.target.id == 'days_1' && ev.target.checked) {
          this.switchDaysArray.push(
            `broj_dana >= 1 AND broj_dana <= 5 AND is_active = "ACTIVE"`
          );
        } else if (ev.target.id == 'days_1' && !ev.target.checked) {
          this.switchDaysArray.splice(
            this.switchDaysArray.indexOf(
              `broj_dana >= 1 AND broj_dana <= 5 AND is_active = "ACTIVE"`
            ),
            1
          );
        } else if (ev.target.id == 'days_2' && ev.target.checked) {
          this.switchDaysArray.push(
            `broj_dana >= 6 AND broj_dana <= 10 AND is_active = "ACTIVE"`
          );
        } else if (ev.target.id == 'days_2' && !ev.target.checked) {
          this.switchDaysArray.splice(
            this.switchDaysArray.indexOf(
              `broj_dana >= 6 AND broj_dana <= 10 AND is_active = "ACTIVE"`
            ),
            1
          );
        } else if (ev.target.id == 'days_3' && ev.target.checked) {
          this.switchDaysArray.push(
            `broj_dana >= 11 AND broj_dana <= 15 AND is_active = "ACTIVE"`
          );
        } else if (ev.target.id == 'days_3' && !ev.target.checked) {
          this.switchDaysArray.splice(
            this.switchDaysArray.indexOf(
              `broj_dana >= 11 AND broj_dana <= 15 AND is_active = "ACTIVE"`
            ),
            1
          );
        } else if (ev.target.id == 'days_4' && ev.target.checked) {
          this.switchDaysArray.push(
            `broj_dana >= 15 AND broj_dana <= 20 AND is_active = "ACTIVE"`
          );
        } else if (ev.target.id == 'days_4' && !ev.target.checked) {
          this.switchDaysArray.splice(
            this.switchDaysArray.indexOf(
              `broj_dana >= 15 AND broj_dana <= 20 AND is_active = "ACTIVE"`
            ),
            1
          );
        }
        break;
      case ev.target.id.includes('transport'):
        if (ev.target.checked) {
          this.switchTransportArray.push(
            `transport_id = "${param}" AND is_active = "ACTIVE"`
          );
        } else {
          this.switchTransportArray.splice(
            this.switchTransportArray.indexOf(
              `transport_id = "${param}" AND is_active = "ACTIVE"`
            ),
            1
          );
        }
        break;
      case ev.target.id.includes('price'):
        if (ev.target.id == 'price_1' && ev.target.checked) {
          this.switchPriceArray.push(
            `price >= 10 AND price <= 99 AND is_active = "ACTIVE"`
          );
        } else if (ev.target.id == 'price_1' && !ev.target.checked) {
          this.switchPriceArray.splice(
            this.switchPriceArray.indexOf(
              `price >= 10 AND price <= 99 AND is_active = "ACTIVE"`
            ),
            1
          );
        } else if (ev.target.id == 'price_2' && ev.target.checked) {
          this.switchPriceArray.push(
            `price >= 100 AND price <= 499 AND is_active = "ACTIVE"`
          );
        } else if (ev.target.id == 'price_2' && !ev.target.checked) {
          this.switchPriceArray.splice(
            this.switchPriceArray.indexOf(
              `price >= 100 AND price <= 499 AND is_active = "ACTIVE"`
            ),
            1
          );
        } else if (ev.target.id == 'price_3' && ev.target.checked) {
          this.switchPriceArray.push(
            `price >= 500 AND price <= 999 AND is_active = "ACTIVE"`
          );
        } else if (ev.target.id == 'price_3' && !ev.target.checked) {
          this.switchPriceArray.splice(
            this.switchPriceArray.indexOf(
              `price >= 500 AND price <= 999 AND is_active = "ACTIVE"`
            ),
            1
          );
        } else if (ev.target.id == 'price_4' && ev.target.checked) {
          this.switchPriceArray.push(
            `price >= 1000 AND price <= 2000 AND is_active = "ACTIVE"`
          );
        } else if (ev.target.id == 'price_4' && !ev.target.checked) {
          this.switchPriceArray.splice(
            this.switchPriceArray.indexOf(
              `price >= 1000 AND price <= 2000 AND is_active = "ACTIVE"`
            ),
            1
          );
        } else if (ev.target.id == 'price_5' && ev.target.checked) {
          this.switchPriceArray.push(`price >= 2000 AND is_active = "ACTIVE"`);
        } else if (ev.target.id == 'price_5' && !ev.target.checked) {
          this.switchPriceArray.splice(
            this.switchPriceArray.indexOf(
              `price >= 2000 AND is_active = "ACTIVE"`
            ),
            1
          );
        }
        break;
      default:
        this.switchCountryArray = [];
        this.switchDaysArray = [];
    }
    midMerged = [
      this.switchCountryArray,
      this.switchDaysArray,
      this.switchPriceArray,
      this.switchTransportArray,
    ];

    let preQuery = [];

    for (let i = 0; i < midMerged.length; i++) {
      if (midMerged[i].length != 0) {
        preQuery.push(`(${midMerged[i].join(' OR ')})`);
      }
    }

    let joinedPreQuery = preQuery.join(' AND ');
    let mainQuery = `SELECT * FROM destination WHERE ${joinedPreQuery};`;
    if (joinedPreQuery) {
      this.destinationService
        .filterService(mainQuery)
        .subscribe((result: any) => {
          this.filteredResult = result;
        });
    } else {
      this.filteredResult = [];
    }
  }
}
