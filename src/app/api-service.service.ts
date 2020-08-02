import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }


  url: any = "https://www.metaweather.com/api/location/"
  proxy: any = "https://cors-anywhere.herokuapp.com/"


  getWeatherData(ID) {
    console.log(ID)
    return this.http.get(
      `${this.proxy}${this.url}${ID}`
    );
  }

  getNewData(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ff1bc4683fc7325e9c57e586c20cc03e`;
    return this.http.get(url);
  }

}
