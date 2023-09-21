import { Component, OnInit } from '@angular/core';
import { HotObservable } from 'rxjs/internal/testing/HotObservable';

@Component({
  selector: 'landing-header',
  templateUrl: './headerForMain.component.html',
  styleUrls: ['./headerForMain.component.scss'],
})
export class headerForMain implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.lang = localStorage.getItem('Language');
  }

  //title: string = "ტურიზმის სტატისტიკის პორტალი";

  lang: any;

  langImg = 'assets/img/headerIcons/lang.svg';
  facebook = 'assets/img/headerIcons/fb.svg';
  twitter = 'assets/img/headerIcons/twitter.svg';
  linkedIN = 'assets/img/headerIcons/linkedIn.svg';

  changeLang() {
    this.lang = this.lang == 'GEO' ? 'ENG' : 'GEO';
    localStorage.setItem('Language', this.lang);
    window.location.reload();
  }
}
