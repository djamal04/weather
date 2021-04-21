import {City} from './city';

export interface CityMarkerPosition {
  city: City;
  position: google.maps.LatLngLiteral;
}
