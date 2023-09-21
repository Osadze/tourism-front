import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IIndicator } from 'src/app/common/IIndicator';

@Injectable({
  providedIn: 'root',
})
export class AdminPanelService {
  readonly APIUrl: string = 'http://tourismapi.geostat.ge/api/User/indicators';

  readonly EditUrl: string = 'http://tourismapi.geostat.ge/api/User/edit';

  readonly PatchUrl: string = 'http://tourismapi.geostat.ge/api/User/forPatch';

  constructor(private http: HttpClient) {
    this.lang = localStorage.getItem('Language');
  }

  lang: any;

  unsubscribe$ = new Subject<void>();

  patchObj: IIndicator = {
    Id: 0,
    NameEN: '',
    NameGE: '',
  };

  IndicatorsGE: string[] = [
    'ასაკობრივი ჯგუფი (შსს)',
    'ასაკობრივი ჯგუფი (საქსტატი)',
    'საზღვარი',
    'საზღვრის ტიპი',
    'კონტინენტი',
    'ქვეყანა',
    'ქვეყნების ჯგუფი',
    'ეკონომიკური სტატუსი',
    'სქესი',
    'მიზანი',
    'სასტუმროს ტიპი',
    'იურიდიული ფორმა',
    'თვე',
    'კვარტალი',
    'შეფასება',
    'რეგიონი',
    'ოთახი',
    'მონახულებული ქვეყანა',
    'რიგითობა',
    'ტურიზმის ტიპი',
    'ვიზიტის ტიპი',
    'ტრანსპორტის ტიპი',
    'აქტივობა',
  ];

  IndicatorsEN: string[] = [
    'Age Group (MIA)',
    'Age Group (GeoStat)',
    'Border',
    'Border Type',
    'Continent',
    'Country',
    'Country Group',
    'Economic Status',
    'Gender',
    'Goal',
    'Hotel Type',
    'Legal Form',
    'Month',
    'Quarter',
    'Rate',
    'Region',
    'Room',
    'Seen Country',
    'Sequence',
    'Tourism Type',
    'Tour Type',
    'Transport Type',
    'Activity',
  ];

  GetIndicators() {
    if (this.lang === 'GEO') {
      return this.IndicatorsGE;
    } else {
      return this.IndicatorsEN;
    }
  }

  GetNameIDs(id: number): any {
    return this.http.get<any>(this.APIUrl + '?indicator=' + id);
  }

  GetObjForPatch(id: number, entity: number): any {
    this.http
      .get<any>(this.PatchUrl + '?id=' + id + '&entity=' + entity)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: any) => {
        this.patchObj = {
          Id: id,
          NameEN: res.nameEN,
          NameGE: res.nameGE,
        };
      });
  }

  EditNames(obj: IIndicator) {
    return this.http.patch<IIndicator>(this.EditUrl, obj);
  }

  SelectedID: number = 0;

  SetSelID(id: number) {
    this.SelectedID = id;
  }

  GetSelID() {
    return this.SelectedID;
  }

  SetPatchObj(obj: IIndicator) {
    this.patchObj = obj;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
