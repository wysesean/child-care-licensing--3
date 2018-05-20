import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FeatureCollection, GeometryObject } from 'geojson';

@Injectable()
export class MapService {
  constructor(protected _http: HttpClient) {}

  fetchOperations(query: string) {
    return this._http
      .get(`${environment.OPERATIONS_URL}?$$app_token=${environment.APP_TOKEN}&${query}`)
      .pipe(map(response => response), catchError(err => _throw(err)));
  }

  fetchSingleOperation(query: string) {
    console.log('quer', query);
    const operation = this._http
      .get(`${environment.OPERATIONS_URL}?$$app_token=${environment.APP_TOKEN}&${query}`)
      .pipe(map(response => response), catchError(err => _throw(err)));

    const activity = this._http
      .get(`${environment.ACTIVITIES_URL}?$$app_token=${environment.APP_TOKEN}&${query}`)
      .pipe(map(response => response), catchError(err => _throw(err)));

    const nonCompliance = this._http
      .get(`${environment.NONCOMPLIANCE_URL}?$$app_token=${environment.APP_TOKEN}&${query}`)
      .pipe(map(response => response), catchError(err => _throw(err)));

    return forkJoin(operation, activity, nonCompliance).pipe(
      map(data => {
        return {
          operations: data[0],
          activity: data[1],
          nonCompliance: data[2]
        };
      })
    );
  }
}
