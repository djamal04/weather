import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {City} from '../models/city';

// const CITIES_URL = 'http://93.93.42.137/en/api/cities';
const CITIES_URL = 'assets/cities.json';
const FORECAST_URL = 'assets/forecast.json';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  public cities: BehaviorSubject<City[]> = new BehaviorSubject<City[]>(null);
  public city: BehaviorSubject<City> = new BehaviorSubject<City>(null);

  constructor(private httpClient: HttpClient) {}

  public searchCities(cityName: string): Observable<City[]> {
    // const params = new HttpParams().set('domain', cityName);
    // const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Basic ' + btoa('test:XXXXXX'));
    // return this.httpClient.get<City>(CITIES_URL, {headers, params});
    return this.httpClient.get<City[]>(CITIES_URL);
  }

  public getForecast(city: City): Observable<any> {
    return this.httpClient.get<any>(FORECAST_URL);
  }
}
