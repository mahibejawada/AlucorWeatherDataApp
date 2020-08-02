import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ApiServiceService } from './api-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public weatherForm: FormGroup;
  constructor(private service: ApiServiceService, private formBuilder: FormBuilder) { }

  WeatherData: any;
  loader: boolean = false;
  message: string = '';

  ngOnInit() {
    this.weatherForm = this.formBuilder.group({
      city: ['']
    });
  }

  getNewData(data){
    this.loader = true;
    this.WeatherData = '';
    this.service.getNewData(data).subscribe(result => {
      this.setWeatherData(result);
      this.loader = false;
    })
  }
  setWeatherData(data){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
    this.WeatherData.City = this.WeatherData.name;
    this.WeatherData.Date =  new Date();
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let Temprature_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.Temprature_celcius = Temprature_celcius + ' C';
    this.WeatherData.Temprature_Fahrenheit = (Number(Temprature_celcius) * 1.8) + 32 + ' F';
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0) + ' C';
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0) + ' C';
    this.WeatherData.Description = this.WeatherData.weather[0].description;
  }
}
