import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminPanelService } from '../admin-panel.service';
import { IIndicator } from 'src/app/common/IIndicator';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss'],
})
export class IndicatorsComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();

  constructor(private service: AdminPanelService) {
    this.lang = localStorage.getItem('Language');
  }

  ngOnInit(): void {
    this.Indicators = this.service.GetIndicators();
  }

  flag: boolean = true;

  lang: any;

  Indicators: string[] = [];

  NameIDs: IIndicator[] = [];

  ChangeFlag() {
    this.flag = !this.flag;
  }

  SelectedIndicator: number = 0;

  SetNameIDs(indicator: number) {
    this.SelectedIndicator = indicator;

    this.NameIDs = [];

    this.service
      .GetNameIDs(indicator)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: IIndicator[]) => {
        res.forEach((element: any) => {
          this.NameIDs.push({
            Id: element.id,
            NameEN: element.nameEN,
            NameGE: element.nameGE,
          });
        });
      });
  }

  GetObjForPatch(id: number, entity: number) {
    this.service.GetObjForPatch(id, entity);
  }

  // GetObjForPatch(id: number, entity: number) {
  //   this.service.GetObjForPatch(id, entity)
  //     .pipe(takeUntil(this.unsubscribe$))
  //     .subscribe((res: any) => {
  //       this.service.patchObj = {
  //         Id: id,
  //         NameEN: res.NameEN,
  //         NameGE: res.nameGE
  //       }
  //     });
  // }

  SetSelID(id: number) {
    this.service.SetSelID(id);
  }

  GoHome() {
    location.href = '/indicators';
  }

  GetPatchObj() {
    return this.service.patchObj;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
