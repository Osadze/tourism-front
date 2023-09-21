import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IDropDown } from 'src/app/common/IDropDown';

@Injectable({
  providedIn: 'root',
})
export class DefindicatorService {
  readonly APIUrl: string = 'http://tourismapi.geostat.ge/api/Hotels';

  readonly SharedUrl: string = 'http://tourismapi.geostat.ge/api/Shared';

  unsubscribe$ = new Subject<void>();

  constructor(private http: HttpClient) {
    this.lang = localStorage.getItem('Language');
  }

  lang: any;

  indicators: IDropDown[] = [
    { name: 'სასტუმროების რაოდენობა', value: 1, isDisabled: false },
    { name: 'სტუმრების რაოდენობა', value: 2, isDisabled: false },
  ];

  getYears() {
    return this.http.get<any>(this.APIUrl + '/year');
  }

  GetRegions() {
    return this.http.get<any>(
      this.SharedUrl + '/getNamesWithID?entity=Regions&lang=' + this.lang
    );
  }

  GetCountryGroup() {
    return this.http.get<any>(
      this.SharedUrl + '/getNamesWithID?entity=CountryGroups&lang=' + this.lang
    );
  }

  getMainChartData(optList: string, year: number) {
    var url =
      this.APIUrl +
      '/sanqiHotel?optSt=' +
      optList +
      '&year=' +
      year +
      '&lang=' +
      this.lang;

    return this.http.get<any>(url);
  }

  getMainChartDataGuests(optList: string, year: number) {
    var url =
      this.APIUrl +
      '/sanqiGuests?optSt=' +
      optList +
      '&year=' +
      year +
      '&lang=' +
      this.lang;

    return this.http.get<any>(url);
  }

  getDataForHotelCount(optList: string) {
    var url =
      this.APIUrl + '/hotelCount?optSt=' + optList + '&lang=' + this.lang;

    return this.http.get<any>(url);
  }

  getDataForRoomBad(optList: string) {
    var url =
      this.APIUrl + '/roomsAndBeds?optSt=' + optList + '&lang=' + this.lang;

    return this.http.get<any>(url);
  }

  getDataForGuestCount(optList: string) {
    var url = this.APIUrl + '/guests?optSt=' + optList + '&lang=' + this.lang;

    return this.http.get<any>(url);
  }

  getDataForIncoms(optList: string) {
    var url = this.APIUrl + '/revenue?optSt=' + optList + '&lang=' + this.lang;

    return this.http.get<any>(url);
  }

  getDataForGender(optList: string) {
    var url = this.APIUrl + '/employes?optSt=' + optList + '&lang=' + this.lang;

    return this.http.get<any>(url);
  }

  getDataForCoasts(optList: string) {
    var url = this.APIUrl + '/coasts?optSt=' + optList + '&lang=' + this.lang;

    return this.http.get<any>(url);
  }

  getHotelTypes() {
    var url = this.SharedUrl + '/hotelTypes?lang=' + this.lang;

    return this.http.get<any>(url);
  }

  getRoomTypes() {
    var url = this.SharedUrl + '/rooms?lang=' + this.lang;

    return this.http.get<any>(url);
  }

  getCountryGroups() {
    var url = this.SharedUrl + '/countryGroups?lang=' + this.lang;

    return this.http.get<any>(url);
  }

  getGenders() {
    var url = this.SharedUrl + '/genders?lang=' + this.lang;

    return this.http.get<any>(url);
  }
}
