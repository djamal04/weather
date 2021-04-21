import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {CityService} from '../../services/city.service';
import {GoogleMap} from '@angular/google-maps';
import {CityMarkerPosition} from '../../models/city-marker-position';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  apiLoaded: Observable<boolean>;
  center: google.maps.LatLngLiteral = {lat: 43.6043, lng: 1.4437};
  zoom = 11;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: CityMarkerPosition[] = [];

  @ViewChild(GoogleMap)
  private googleMap: GoogleMap;

  constructor(private httpClient: HttpClient, private cityService: CityService) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyBtbVYFFOwTxm1_sn5WOA4R6FYZKoKd_pY', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  ngOnInit(): void {
    this.cityService.cities.subscribe(cities => {
      this.markerPositions.length = 0;
      if (cities != null) {
        const bounds = new google.maps.LatLngBounds();
        cities.forEach(city => {
          const marker = {lat: +city.latitude, lng: +city.longitude};
          bounds.extend(marker);
          this.markerPositions.push({city: city, position: marker});
        });
        this.googleMap.fitBounds(bounds);
        this.center = {lat: +cities[0].latitude, lng: +cities[0].longitude};
      }
    });
  }

  forecast(cityMarkerPosition: CityMarkerPosition): void {
    this.cityService.city.next(cityMarkerPosition.city);
  }
}
