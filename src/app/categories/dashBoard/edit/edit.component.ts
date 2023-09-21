import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AdminPanelService } from '../admin-panel.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();

  constructor(private service: AdminPanelService) {
    this.lang = localStorage.getItem('Language');
  }

  ngOnInit(): void {}

  lang: any;

  flag: boolean = true;

  SelectedtID: number = 0;

  user: string = 'portaladmin';

  password: string = 'portaluser-+';

  GetSelID() {
    return this.service.GetSelID();
  }

  ChangeFlag() {
    this.flag = !this.flag;
  }

  CheckUser() {
    if (this.GetPatchObj().Id == 0) {
      location.href = '/indicators';
    } else {
      const uName = document.getElementById('uName') as HTMLInputElement;

      var uPass = document.getElementById('uPass') as HTMLInputElement;

      var userName = uName.value;
      var userPass = uPass.value;

      if (userName === this.user && userPass === this.password) {
        this.ChangeFlag();
      }
    }
  }

  GetPatchObj() {
    return this.service.patchObj;
  }

  myFunction() {
    var message: string = '';

    if (this.lang == 'GEO') {
      message = 'გსურთ დაადასტუროთ ცვლილებები?';
    } else {
      message = 'Do you want to confirm the changes?';
    }
    var res = confirm(message);

    if (res == true) {
      alert('Hello');
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
