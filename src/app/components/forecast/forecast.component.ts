import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {CityService} from '../../services/city.service';
import {City} from '../../models/city';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class TemperatureComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    title: {
      text: 'Forecast'
    },
    series: []
  };
  citySelected = false;

  constructor(private cityService: CityService) {
  }

  ngOnInit(): void {
    this.cityService.city.subscribe(
      city => this.displayForecast(city)
    );
  }

  private displayForecast(city: City): void {
    this.citySelected = false;
    if (city) {
      this.chartOptions.series.length = 0;
      this.cityService.getForecast(city).subscribe(
        forecast => {
          const data = forecast['data'];
          const forecastCity = data ['4956'];
          const params = forecastCity['params'];
          this.displayHumidity(params);
          this.displayTemperature(params);
          this.citySelected = true;
        }
      );
    }
  }

  private displayTemperature(params) {
    // TODO refacotor with displayHumidity
    const temperatureValues = [];
    const temperature = params['t'];
    for (let date in temperature) {
      const value = temperature[date];
      const temperatureValue = +value['C'];
      if (temperatureValue) {
        temperatureValues.push(temperatureValue);
      }
    }
    this.chartOptions.series.push({
      type: 'spline',
      data: temperatureValues,
      name: 'Temperature'
    });
  }

  private displayHumidity(params) {
    const humidityValues = [];
    const dates = [];
    const humidity = params['hu'];
    for (let date in humidity) {
      const value = humidity[date];
      const humidityValue = +value['%'];
      if (humidityValue) {
        dates.push(date);
        humidityValues.push(humidityValue);
      }
    }
    this.chartOptions.xAxis = {
      categories: dates
    };
    this.chartOptions.series.push({
      type: 'spline',
      data: humidityValues,
      name: 'Humidity'
    });
  }
}
