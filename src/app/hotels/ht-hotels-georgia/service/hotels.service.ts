import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HotelsService {
  readonly APIUrl: string = 'https://tourismapi.geostat.ge/api/Hotels';

  readonly SharedUrl: string = 'https://tourismapi.geostat.ge/api/Shared';

  constructor(private http: HttpClient) {
    this.lang = localStorage.getItem('Language');
  }

  GetHotelTypes() {
    return this.http.get<any>(
      this.SharedUrl + '/getNamesWithID?entity=HotelTypes&lang=' + this.lang
    );
  }

  GetRoomNumbers() {
    return this.http.get<any>(
      this.SharedUrl + '/getNamesWithID?entity=RoomCount&lang=' + this.lang
    );
  }

  lang: any;

  getHotels(innType: string, rooms: string) {
    return this.http.get<any>(
      this.APIUrl + '/locations?innType=' + innType + '&rooms=' + rooms
    );
  }

  getHotelInfo(taxId: number) {
    return this.http.get<any>(
      this.APIUrl + '/hotelsFromRegistre?taxId=' + taxId
    );
  }
}
