import { Injectable } from '@angular/core';
import { IDropDown } from 'src/app/common/IDropDown';
import { IDropDownSt } from 'src/app/common/IdropDownSt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComparisionService {
  readonly APIUrl: string = 'http://tourismapi.geostat.ge/api/Comperision';

  readonly SharedURL: string = 'http://tourismapi.geostat.ge/api/Shared';

  constructor(private http: HttpClient) {
    this.lang = localStorage.getItem('Language');
  }

  lang: any;
  year: number = 0;

  getYears() {
    var uRl = this.APIUrl + '/compYears';

    return this.http.get<number[]>(uRl);
  }

  getLastYear() {
    var uRl = this.APIUrl + '/lastYear';

    return this.http.get<number>(uRl);
  }

  GetQuarters() {
    var url =
      this.SharedURL + '/getNamesWithID?entity=Quarters&lang=' + this.lang;

    return this.http.get<any>(url);
  }

  indicMain: IDropDownSt[] = [
    { name: 'მიზანი', value: 'Goal', isDisabled: false },
    { name: 'აქტივობა', value: 'Visit', isDisabled: false },
    { name: 'კმაყოფილება', value: 'Rate', isDisabled: false },
    { name: 'ტრანსპორტი', value: 'Transport', isDisabled: false },
    { name: 'რიგითობა', value: 'Sequence', isDisabled: false },
    // { name: 'დანახარჯი', value: 'Expence', isDisabled: false },
  ];

  indicMainEN: IDropDownSt[] = [
    { name: 'Purpose', value: 'Goal', isDisabled: false },
    { name: 'Activity', value: 'Visit', isDisabled: false },
    { name: 'Satisfaction Level', value: 'Rate', isDisabled: false },
    { name: 'Transport', value: 'Transport', isDisabled: false },
    { name: 'Order of visit', value: 'Sequence', isDisabled: false },
    // { name: 'Expenditure', value: 'Expence', isDisabled: false },
  ];

  getIndicMain() {
    if (this.lang == 'ENG') {
      return this.indicMainEN;
    } else {
      return this.indicMain;
    }
  }

  indicHelp: IDropDownSt[] = [
    { name: 'ყველა', value: 'All', isDisabled: false },
    { name: 'ვიზიტის ტიპი', value: 'TourType', isDisabled: false },
    { name: 'სქესი', value: 'Gender', isDisabled: false },
    { name: 'ასაკი', value: 'Age', isDisabled: false },
    // { name: 'ეკონომიური სტატუსი', value: 'Activity', isDisabled: false},
  ];

  indicHelpEN: IDropDownSt[] = [
    { name: 'Total', value: 'All', isDisabled: false },
    { name: 'Type of visit', value: 'TourType', isDisabled: false },
    { name: 'Gender', value: 'Gender', isDisabled: false },
    { name: 'Age', value: 'Age', isDisabled: false },
    // { name: 'Economic status', value: 'Activity', isDisabled: false},
  ];

  getIndicHelp() {
    if (this.lang == 'ENG') {
      return this.indicHelpEN;
    } else {
      return this.indicHelp;
    }
  }

  GetAges(): Observable<string[]> {
    var url = this.SharedURL + '/ageGroupLocal?lang=' + this.lang;

    return this.http.get<string[]>(url);
  }

  GetGenders() {
    var url = this.SharedURL + '/genders?lang=' + this.lang;

    return this.http.get<any>(url);
  }

  GetTourTypes() {
    var url = this.SharedURL + '/tourTypes?lang=' + this.lang;

    return this.http.get<any>(url);
  }
}
