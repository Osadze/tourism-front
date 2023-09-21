import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router, NavigationEnd, Navigation } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('mainButtons') buttons!: ElementRef;
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang('GEO');
    this.translateService.use(localStorage.getItem('Language') || 'GEO');
  }

  ngOnInit(): void {}
  title = 'tourism-portal';
}
