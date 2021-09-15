import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { result } from 'lodash';
import { Destination } from 'src/app/models/Destination.model';
import { environment } from 'src/environments/environment';
import { DataService } from '../common/data.service';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  constructor(private http: HttpClient, private data: DataService) {}

  getTransportType() {
    return this.http.get(environment.serverUrl + '/get-transport-types');
  }

  createDestinationSercvice(destination: Destination) {
    return this.http.post(
      environment.serverUrl + '/destination-create',
      destination
    );
  }

  getAllDestinations() {
    return this.http.get(environment.serverUrl + '/get-all-destinations');
  }

  deleteDestination(body: any) {
    console.log(body);
    return this.http.put(
      environment.serverUrl +
        '/destination-delete/' +
        parseInt(body['dest_id']),
      body
    );
  }

  countDestinations() {
    this.http
      .get(environment.serverUrl + '/destinations-count')
      .subscribe((success: any) => {
        this.data.updateCounter(success.numOfDest);
        return success.numOfDest;
      });
  }

  updateDestination(body: any) {
    console.log(body['dest_id']);
    return this.http.put(
      environment.serverUrl +
        '/destiantion-update/' +
        parseInt(body['dest_id']),
      body
    );
  }

  getDestinationById(info_id: any) {
    this.http
      .get(environment.serverUrl + '/get-destination-by-id/' + info_id)
      .subscribe((success: any) => {
        console.log('informer', success);
        this.data.informer(success);

        return success;
      });
  }

  parseDestinationProgram(id?: any) {
    return this.http.get(
      environment.serverUrl + '/get-destination-program/' + id
    );
  }

  getDestinationByIdtoStorage(info_id: any) {
    return this.http.get(
      environment.serverUrl + '/get-destination-by-id/' + info_id
    );
  }

  postLastVisited(hey: any) {
    return this.http
      .post(environment.serverUrl + '/last-visited', {
        id: hey,
      })
      .subscribe((result) => {
        console.log(result);
      });
  }

  getLastVisited() {
    return this.http.get(environment.serverUrl + '/get-last-visited');
  }

  deleteVisitedHistory(id: any) {
    return this.http
      .delete(environment.serverUrl + '/delete-vidited-history/' + id)
      .subscribe((result) => {
        console.log(result);
      });
  }

  searchDestinations(name: string) {
    return this.http.get(
      environment.serverUrl + '/destinations-search/' + name
    );
  }

  getUniqueCountriesRegister() {
    return this.http.get(environment.serverUrl + '/get-unique-country-rows');
  }

  filterService(query: string) {
    return this.http.get(
      environment.serverUrl + '/filter-destinations/' + query
    );
  }

  getByIdDetails(id: any) {
    return this.http.get(
      environment.serverUrl + '/get-destination-by-id/' + id
    );
  }
}
