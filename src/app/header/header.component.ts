import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.lang = localStorage.getItem('Language') || 'GEO';
    if (!localStorage.getItem('Language')) {
      localStorage.setItem('Language', this.lang);
    }
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
