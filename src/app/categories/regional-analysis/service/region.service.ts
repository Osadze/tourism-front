import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataForMapChart } from './dataForMapChart';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  readonly APIUrl: string = 'http://tourismapi.geostat.ge/api/region';

  readonly SharedURL: string = 'http://tourismapi.geostat.ge/api/Shared';

  constructor(private http: HttpClient) {
    this.lang = localStorage.getItem('Language');
  }

  lang: any;

  getYears(trmType: number) {
    var uRl = this.APIUrl + '/years?trmType=' + trmType;

    return this.http.get<number[]>(uRl);
  }

  getRegions() {
    var uRl = this.SharedURL + '/regions?lang=' + this.lang;

    return this.http.get<string[]>(uRl);
  }

  getDataForMapChart(
    type: number,
    yr: number,
    opt: string,
    inOut: number,
    byProp: string,
    flag: string
  ) {
    let uRl =
      this.APIUrl +
      '/mapChart?type=' +
      type +
      '&year=' +
      yr +
      '&opt=' +
      opt +
      '&inOut=' +
      inOut +
      '&byProp=' +
      byProp +
      '&flag=' +
      flag +
      '&lang=' +
      this.lang;

    return this.http.get<DataForMapChart[]>(uRl);
  }

  getDataForExpenceTable(opt: string, byProp: string, regioni: number) {
    let url =
      this.APIUrl +
      '/expenceByRegions?opt=' +
      opt +
      '&byProp=' +
      byProp +
      '&lang=' +
      this.lang +
      '&region=' +
      regioni;

    return this.http.get<any>(url);
  }

  getDataForRegMigration(year: number, opt: string, prop: string) {
    var uRl =
      this.APIUrl +
      '/regionMigration?year=' +
      year +
      '&opt=' +
      opt +
      '&byProp=' +
      prop +
      '&lang=' +
      this.lang;

    return this.http.get<any>(uRl);
  }

  GetGenders() {
    return this.http.get<any>(
      this.SharedURL + '/getNamesWithID?entity=Genders&lang=' + this.lang
    );
  }

  GetAges() {
    return this.http.get<any>(
      this.SharedURL + '/getNamesWithID?entity=AgeGroupsLocal&lang=' + this.lang
    );
  }

  goalsGE = [
    { name: 'დასვენება', isDisabled: false, value: 1 },
    { name: 'მეგობრები', isDisabled: false, value: 2 },
    { name: 'მკურნალობა', isDisabled: false, value: 5 },
    { name: 'შოპინგი', isDisabled: false, value: 3 },
    { name: 'საქმიანობა', isDisabled: false, value: 4 },
    { name: 'სხვა', isDisabled: false, value: 7 },
  ];

  goalsEN = [
    { name: 'Holiday, Leisure, Recreation', isDisabled: false, value: 1 },
    { name: 'Visiting friends/relatives', isDisabled: false, value: 2 },
    { name: 'Health and Medical Care', isDisabled: false, value: 5 },
    { name: 'Shopping', isDisabled: false, value: 3 },
    { name: 'Business or Professional', isDisabled: false, value: 4 },
    { name: 'Other purpose', isDisabled: false, value: 7 },
  ];

  goals() {
    if (this.lang == 'GEO') {
      return this.goalsGE;
    } else {
      return this.goalsEN;
    }
  }

  visitsGE = [
    // { name: "კულტურული", selected: false, id: 1 },
    // { name: "ზღვა", selected: false, id: 2 },
    // { name: "ბუნება", selected: false, id: 4 },
    { name: 'ჭამა_სმა', isDisabled: false, value: 4 },
    { name: 'შოპინგი', isDisabled: false, value: 7 },
    { name: 'მეგობრები', isDisabled: false, value: 8 },
    { name: 'სხვა', isDisabled: false, value: 9 },
  ];

  visitsEN = [
    // { name: "Sightseeing/Visiting cultural and historical heritage/Museums", selected: false, id: 1 },
    // { name: "Going to the beach/Swimming in the sea/lake/river", selected: false, id: 2 },
    // { name: "Visiting national parks/Nature/Landscape, exploring remote and exotic places", selected: false, id: 4 },
    { name: 'Tasting local cuisine and wine', isDisabled: false, value: 4 },
    { name: 'Shopping', isDisabled: false, value: 7 },
    { name: 'Visiting friends/relatives', isDisabled: false, value: 8 },
    { name: 'Other activity', isDisabled: false, value: 9 },
  ];

  visits() {
    if (this.lang == 'ENG') {
      return this.visitsEN;
    } else {
      return this.visitsGE;
    }
  }

  transportsGE = [
    { name: 'ავტობუსი', isDisabled: false, value: 3 },
    { name: 'მანქანა', isDisabled: false, value: 4 },
    { name: 'სხვა', isDisabled: false, value: 5 },
  ];

  transportsEN = [
    { name: 'Bus/Minibus', isDisabled: false, value: 3 },
    { name: 'Own/relatives car', isDisabled: false, value: 4 },
    { name: 'Other transport', isDisabled: false, value: 5 },
  ];

  transports() {
    if (this.lang == 'ENG') {
      return this.transportsEN;
    } else {
      return this.transportsGE;
    }
  }

  ratesGE = [
    { name: 'ძალიანუკმაყოფილო', isDisabled: false, value: 5 },
    { name: 'უკმაყოფილო', isDisabled: false, value: 4 },
    { name: 'არცერთი', isDisabled: false, value: 3 },
    { name: 'კმაყოფილი', isDisabled: false, value: 2 },
    { name: 'ძალიანკმაყოფილი', isDisabled: false, value: 1 },
    { name: 'სხვა', isDisabled: false, value: 6 },
  ];

  ratesEN = [
    { name: 'Very Dissatisfied', isDisabled: false, value: 5 },
    { name: 'Dissatisfied', isDisabled: false, value: 4 },
    {
      name: 'Neither satisfied, nor dissatisfied',
      isDisabled: false,
      value: 3,
    },
    { name: 'Satisfied', isDisabled: false, value: 2 },
    { name: 'Very satisfied', isDisabled: false, value: 1 },
    { name: "I don't know/hard to answer", isDisabled: false, value: 6 },
  ];

  rates() {
    if (this.lang == 'ENG') {
      return this.ratesEN;
    } else {
      return this.ratesGE;
    }
  }

  getOptionList(opt: number, optionList: number[]): number[] {
    optionList.push(opt);

    return optionList;
  }
}
