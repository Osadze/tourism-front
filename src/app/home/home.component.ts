import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  // title1: string = "ვიზიტორთა\nგამოკვლევის შედეგები";
  // title2: string = "სასტუმროების" + "\n" +
  // "გამოკვლევის შედეგები";
  enter1: string = 'გადასვლა';

  h: number = 1;

  visitors = 'assets/img/landingPage/visitors.jpg';
  hotels = 'assets/img/landingPage/hotels.jpg';

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
    this.h = 2;
  }

  clickedFirst() {
    this.h = 2;
  }

  clickedSecond() {
    this.h = 1;
  }
}
