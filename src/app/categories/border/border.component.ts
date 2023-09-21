import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDropDown } from 'src/app/common/IDropDown';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Observable, Subject, takeUntil } from 'rxjs';
import { BorderService } from './service/border.service';

@Component({
  selector: 'app-border',
  templateUrl: './border.component.html',
  styleUrls: ['./border.component.scss'],
})
export class BorderComponent implements OnInit, OnDestroy {
  readonly APIUrl: string = 'http://tourismapi.geostat.ge/api/International';

  unsubscribe$ = new Subject<void>();

  forYears$!: Observable<number[]>;
  forYearsReverced$!: Observable<number[]>;

  constructor(private http: HttpClient, private service: BorderService) {
    this.service
      .GetYears(this.tType)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.years = res['normal'];
        this.year = res['normal'][0];

        this.yearsReverced = res['reversed'];
        this.yearEnd = res['reversed'][0];

        this.getVisitsChart(
          this.year,
          this.yearEnd,
          this.startM.value,
          this.endM.value
        );
      });

    this.lang = localStorage.getItem('Language');
  }

  lang: any;

  GetMonthies() {
    if (this.lang == 'GEO') {
      this.monthies.push({
        name: 'აირჩიეთ თვე',
        value: 0,
        isDisabled: false,
      });

      this.monthiesEnd.push({
        name: 'აირჩიეთ თვე',
        value: 0,
        isDisabled: false,
      });
    } else {
      this.monthies.push({
        name: 'Select a Month',
        value: 0,
        isDisabled: false,
      });

      this.monthiesEnd.push({
        name: 'Select a Month',
        value: 0,
        isDisabled: false,
      });
    }

    this.service
      .GetMonthies()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        for (const key of Object.keys(res)) {
          this.monthies.push({
            name: key,
            value: res[key],
            isDisabled: false,
          });

          this.monthiesEnd.push({
            name: key,
            value: res[key],
            isDisabled: false,
          });
        }
      });
  }

  ngOnInit(): void {
    this.GetMonthies();
  }

  years!: number[];
  year: number = 0;

  yearsReverced!: number[];
  yearEnd: number = 0;

  monthies: IDropDown[] = [];
  startM: IDropDown = { name: 'აირჩიეთ თვე', value: 0, isDisabled: false };

  monthiesEnd: IDropDown[] = [];
  endM: IDropDown = { name: 'აირჩიეთ თვე', value: 0, isDisabled: false };

  denger: boolean = false;

  tType: number = 1;

  changedenger() {
    this.denger = false;
  }

  GetYears(tType: number) {
    this.service
      .GetYears(tType)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.years = res['normal'];
        this.year = res['normal'][0];

        this.yearsReverced = res['reversed'];
        this.yearEnd = res['reversed'][0];
      });
  }

  getChart() {
    if (
      Number(this.year) >= Number(this.yearEnd) &&
      Number(this.startM.value) > Number(this.endM.value)
    ) {
      this.denger = true;
    } else {
      if (this.startM.value == 0 && this.endM.value != 0) {
        this.getVisitsChart(this.year, this.yearEnd, 1, this.endM.value);
      } else if (this.endM.value == 0 && this.startM.value != 0) {
        this.getVisitsChart(this.year, this.yearEnd, this.startM.value, 12);
      } else {
        this.getVisitsChart(
          this.year,
          this.yearEnd,
          this.startM.value,
          this.endM.value
        );
      }
    }
  }

  getVisitsChart(st: number, en: number, stM: number, enM: number) {
    if (this.tType == 1) {
      this.http
        .get<any>(
          this.APIUrl +
            '/countByBorders?start=' +
            st +
            '&end=' +
            en +
            '&startM=' +
            stM +
            '&endM=' +
            enM +
            '&lang=' +
            this.lang
        )
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data) => {
          let resUpdated = data.map((i: any) => {
            return Object.keys(i)
              .sort()
              .reduce(function (result: any, key) {
                result[key] = i[key];
                return result;
              }, {});
          });
          this.helpChart(resUpdated, '', 'topChart');
        });
    } else {
      this.http
        .get<any>(
          this.APIUrl +
            '/countByBordersExit?start=' +
            st +
            '&end=' +
            en +
            '&startM=' +
            stM +
            '&endM=' +
            enM +
            '&lang=' +
            this.lang
        )
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data) => {
          let resUpdated = data.map((i: any) => {
            return Object.keys(i)
              .sort()
              .reduce(function (result: any, key) {
                result[key] = i[key];
                return result;
              }, {});
          });
          this.helpChart(resUpdated, '', 'topChart');
        });
    }
  }

  reload() {
    window.location.reload();
  }

  changeFlag(flag: number) {
    this.tType = flag;
  }

  helpChart(res: any, chart: any, chartDiv: string) {
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    chart = am4core.create(chartDiv, am4charts.XYChart);
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'year';
    categoryAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    valueAxis.numberFormatter = new am4core.NumberFormatter();
    valueAxis.numberFormatter.numberFormat = '#.%';
    valueAxis.renderer.grid.template.location = 0;
    if (this.lang == 'GEO') {
      valueAxis.title.text = 'პროცენტი';
    }
    if (this.lang == 'ENG') {
      valueAxis.title.text = 'Percent';
    }

    if (Number(this.startM.value) != 0 || Number(this.endM.value != 0)) {
      res.forEach((element: { year: string }) => {
        let st: string = '';

        st = String(element.year);

        let stY: string = st.slice(0, 4);

        let stQ: string = st.slice(5);

        if (stQ == '1') {
          if (this.lang == 'GEO') {
            stQ = 'იან, ';
          }
          if (this.lang == 'ENG') {
            stQ = 'Jan, ';
          }
        } else if (stQ == '2') {
          if (this.lang == 'GEO') {
            stQ = 'თებ, ';
          }
          if (this.lang == 'ENG') {
            stQ = 'Feb, ';
          }
        } else if (stQ == '3') {
          if (this.lang == 'GEO') {
            stQ = 'მარ, ';
          }
          if (this.lang == 'ENG') {
            stQ = 'Mar, ';
          }
        } else if (stQ == '4') {
          if (this.lang == 'GEO') {
            stQ = 'აპრ, ';
          }
          if (this.lang == 'ENG') {
            stQ = 'Apr, ';
          }
        } else if (stQ == '5') {
          if (this.lang == 'GEO') {
            stQ = 'მაი, ';
          }
          if (this.lang == 'ENG') {
            stQ = 'May, ';
          }
        } else if (stQ == '6') {
          if (this.lang == 'GEO') {
            stQ = 'ივნ, ';
          }
          if (this.lang == 'ENG') {
            stQ = 'Jun, ';
          }
        } else if (stQ == '7') {
          if (this.lang == 'GEO') {
            stQ = 'ივლ, ';
          }
          if (this.lang == 'ENG') {
            stQ = 'Jul, ';
          }
        } else if (stQ == '8') {
          if (this.lang == 'GEO') {
            stQ = 'აგვ, ';
          }
          if (this.lang == 'ENG') {
            stQ = 'Aug, ';
          }
        } else if (stQ == '9') {
          if (this.lang == 'GEO') {
            stQ = 'სექ, ';
          }
          if (this.lang == 'ENG') {
            stQ = 'Sep, ';
          }
        } else if (stQ == '10') {
          if (this.lang == 'GEO') {
            stQ = 'ოქტ, ';
          }
          if (this.lang == 'ENG') {
            stQ = 'Oct, ';
          }
        } else if (stQ == '11') {
          if (this.lang == 'GEO') {
            stQ = 'ნოე, ';
          }
          if (this.lang == 'ENG') {
            stQ = 'Nov, ';
          }
        } else if (stQ == '12') {
          if (this.lang == 'GEO') {
            stQ = 'დეკ, ';
          }
          if (this.lang == 'ENG') {
            stQ = 'Dec, ';
          }
        }

        let fnSt: string = `${stQ} ${stY}`;

        element.year = fnSt;
      });
    }

    chart.data = res;
    let ser: am4charts.LineSeries;

    if (this.lang == 'ENG') {
      ser = this.createSeries('void', 'All', chart, 'All');
    } else {
      ser = this.createSeries('void', 'სულ', chart, 'სულ');
    }

    Object.keys(res[0])
      .filter((x) => x != 'year')
      .forEach((element: string) => {
        this.createSeries(element, element, chart, element);
      });

    // this.borderTypes.forEach(element => {
    //   this.createSeries(element, element, chart, element);
    // });

    //let allSer = chart.series

    ser.events.on('hidden', function () {
      chart.series.values.forEach(function (series: {
        name: any;
        show: () => void;
        hide: () => void;
      }) {
        series.hide();
      });
    });

    ser.events.on('shown', function () {
      chart.series.values.forEach(function (series: {
        name: any;
        show: () => void;
        hide: () => void;
      }) {
        series.show();
      });
    });

    chart.legend = new am4charts.Legend();

    let legendContainer = am4core.create('legenddiv', am4core.Container);
    legendContainer.width = am4core.percent(100);
    legendContainer.height = am4core.percent(100);
    legendContainer.logo.disabled = true;
    chart.legend.parent = legendContainer;

    //chart.legend.logo.disabled = true;

    // chart.legend.maxHeight = 50;
    // chart.legend.scrollable = true;

    chart.legend.useDefaultMarker = true;

    //chart.legend.scrollable = true;
    chart.legend.scrollable = true;

    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.filePrefix =
      this.lang === 'EN'
        ? 'Number of visits By Borders'
        : 'ვიზიტების რაოდენობა საზღვრების მიხედვით';
    // new am4core.ExportMenu();
    chart.exporting.menu.items[0].icon =
      '../../../assets/HomePage/download_icon.svg';
    chart.exporting.menu.align = 'right';
    chart.exporting.menu.verticalAlign = 'top';
    chart.logo.disabled = true;
    let scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX = scrollbarX;
  }

  createSeries(field: string, name: string, chart: any, ragac: string) {
    // Set up series
    let series = chart.series.push(new am4charts.LineSeries());

    // series.stroke = am4core.color("#ff0000"); // red
    series.strokeWidth = 3;

    series.dataFields.categoryX = 'year';
    series.dataFields.valueY = field;

    series.name = name;

    chart.language.locale['_thousandSeparator'] = ' ';
    chart.numberFormatter.numberFormat = '#.';
    chart.logo.disabled = true;

    series.strokeWidth = 2;
    series.tensionX = 0.7;

    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.stroke = am4core.color('#fff');
    bullet.circle.strokeWidth = 2;

    if (this.lang == 'GEO') {
      // if (this.tType == 1) {
      //   bullet.tooltipText =
      //     '[bold]{name}[/]დან შემომსვლელ ვიზიტების რაოდენობა, საწყის პერიოდთან შედარებით,\n{year} წელს შეიცვალა [bold]{valueY.formatNumber("#.%")}-ით';
      // } else {
      //   bullet.tooltipText =
      //     '[bold]{name}[/]დან გამსვლელ ვიზიტების რაოდენობა, საწყის პერიოდთან შედარებით,\n{year} წელს შეიცვალა [bold]{valueY.formatNumber("#.%")}-ით';
      // }

      bullet.tooltipText =
        '[bold]{name}[/]დან ვიზიტების რაოდენობა, საწყის პერიოდთან შედარებით,\n{year} წელს შეიცვალა [bold]{valueY.formatNumber("#.%")}-ით';
    }
    if (this.lang == 'ENG') {
      // if (this.tType == 1) {
      //   bullet.tooltipText =
      //     'Number of incoming visits by [bold]{name}[/], compared to the initial period,\nin {year} year has changed by [bold]{valueY.formatNumber("#.%")}';
      // } else {
      //   bullet.tooltipText =
      //     'Number of outgoing visits by [bold]{name}[/], compared to the initial period,\nin {year} year has changed by [bold]{valueY.formatNumber("#.%")}';
      // }

      bullet.tooltipText =
        'Number of visits by [bold]{name}[/], compared to the initial period,\nin {year} year has changed by [bold]{valueY.formatNumber("#.%")}';
    }

    let shadow = new am4core.DropShadowFilter();
    shadow.dx = 1;
    shadow.dy = 1;
    bullet.filters.push(shadow);

    chart.logo.disabled = true;

    // series.template.tooltipText = "{name}: {categoryX}: {valueY}";

    return series;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    am4core.disposeAllCharts();
  }
}
