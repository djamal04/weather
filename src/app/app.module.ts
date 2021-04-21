import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import {GoogleMapsModule} from '@angular/google-maps';
import {CommonModule, DatePipe} from '@angular/common';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import { SearchComponent } from './components/search/search.component';
import { TemperatureComponent } from './components/forecast/forecast.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {HighchartsChartModule} from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SearchComponent,
    TemperatureComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    NgbModule,
    HighchartsChartModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
