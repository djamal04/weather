import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators';
import {CityService} from '../../services/city.service';
import {City} from '../../models/city';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public noResult = false;
  public loadingSuggestions = false;
  public loadingSuggestionsFailed = false;
  public errorMessage: string;
  public cityInput: City;


  constructor(private cityService: CityService) {
  }

  ngOnInit(): void {
  }

  public search = (text$: Observable<string>) =>
    text$.pipe(
      tap(() => this.noResult = false),
      debounceTime(300),
      filter(val => val.length > 2),
      distinctUntilChanged(),
      tap(() => this.loadingSuggestions = true),
      switchMap(term =>
        this.cityService.searchCities(term.trim()).pipe(
          map(cities => cities.filter(city => city.domain.toLowerCase().startsWith(term.toLowerCase()))),
          tap(() => {
            this.loadingSuggestionsFailed = false;
            this.loadingSuggestions = false;
          }),
          catchError((error) => {
            this.loadingSuggestions = false;
            this.loadingSuggestionsFailed = true;
            this.errorMessage = error.message;
            return of([]);
          }))
      )
    )

  public formatter = (result: City) => {
    return `${result.domain} (${result.description})`;
  }

  public closeFailed(): void {
    this.loadingSuggestionsFailed = false;
  }

  public closeNoResult(): void {
    this.noResult = false;
  }

  public onFocusout(): void {
    this.loadingSuggestions = false;
  }

  public searchCities(): void {
    if ((this.cityInput as City).domain) {
      this.cityService.cities.next([this.cityInput]);
    } else if (this.cityInput as unknown as string) {
      const cityName = this.cityInput as unknown as string;
      this.cityService.searchCities(cityName).subscribe(
        data => {
          this.cityService.cities.next(data.filter(city => city.domain.toLowerCase().startsWith(cityName.toLowerCase())));
        },
        error => {
          this.loadingSuggestions = false;
          this.loadingSuggestionsFailed = true;
          this.errorMessage = error.message;
        }
      );
    }
  }

  public selectedCity($event: NgbTypeaheadSelectItemEvent<City>): void {
    this.cityInput = $event.item;
    this.searchCities();
  }
}
