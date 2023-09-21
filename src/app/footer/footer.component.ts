import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.lang = localStorage.getItem('Language') || 'GEO';
    if (!localStorage.getItem('Language')) {
      localStorage.setItem('Language', this.lang);
    }
  }

  lang: any;
}
