import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDropDown } from 'src/app/common/IDropDown';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Subject, takeUntil } from 'rxjs';
import { BorderService } from '../border/service/border.service';

@Component({
  selector: 'app-top15',
  templateUrl: './top15.component.html',
  styleUrls: ['./top15.component.scss'],
})
export class Top15Component implements OnInit, OnDestroy {
  readonly APIUrl: string = 'http://tourismapi.geostat.ge/api/International';

  unsubscribe$ = new Subject<void>();

  constructor(private http: HttpClient, private service: BorderService) {
    this.service
      .GetYearsAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.years = res['normal'];
        this.year = res['normal'][0];

        this.yearsReverced = res['reversed'];
        this.yearEnd = res['reversed'][0];

        this.getTopChart(
          this.year,
          this.yearEnd,
          this.startM.value,
          this.endM.value,
          this.flag
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
  year!: number;

  comment: String =
    '*იგულისხმება საქართველოს მოქალაქეები, რომლებიც სხვა ქვეყნის რეზიდენტები არიან.';
  yearsReverced!: number[];
  yearEnd!: number;

  monthies: IDropDown[] = [];
  startM: IDropDown = { name: 'აირჩიეთ თვე', value: 0, isDisabled: false };

  monthiesEnd: IDropDown[] = [];
  endM: IDropDown = { name: 'აირჩიეთ თვე', value: 0, isDisabled: false };

  flag: number = 1;

  denger: boolean = false;

  topCountryes: { [key: string]: string } = {};

  changeFlag(num: number) {
    this.flag = num;
  }

  getChart() {
    if (
      Number(this.year) >= Number(this.yearEnd) ||
      (Number(this.year) == Number(this.yearEnd) &&
        Number(this.startM.value) > Number(this.endM.value))
    ) {
      this.denger = true;
    } else {
      if (this.startM.value == 0 && this.endM.value != 0) {
        this.getTopChart(
          this.year,
          this.yearEnd,
          1,
          this.endM.value,
          this.flag
        );
      } else if (this.endM.value == 0 && this.startM.value != 0) {
        this.getTopChart(
          this.year,
          this.yearEnd,
          this.startM.value,
          12,
          this.flag
        );
      } else {
        this.getTopChart(
          this.year,
          this.yearEnd,
          this.startM.value,
          this.endM.value,
          this.flag
        );
      }
    }
  }

  changeStartM() {}
  changeEndm() {}

  changeStart() {}

  changeEnd() {}

  changedenger() {
    this.denger = false;
  }

  getTopChart(st: number, en: number, stM: number, enM: number, fl: number) {
    this.http
      .get<any>(
        this.APIUrl +
          '/topcountryes?start=' +
          st +
          '&end=' +
          en +
          '&startM=' +
          stM +
          '&endM=' +
          enM +
          '&flag=' +
          fl +
          '&lang=' +
          this.lang
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        let newData = data.map((i: any) => {
          if (this.lang === 'GEO') {
            i['საქართველო*'] = i['საქართველო'];
            delete i['საქართველო'];
          }
          if (this.lang === 'ENG') {
            i['Georgia*'] = i['Georgia'];
            delete i['Georgia'];
            this.comment =
              '*Georgian citizens who remain the residents of other country.';
          }
          return i;
        });
        this.helpChart(
          newData,
          'ტოპ ქვეყნები ვიზიტორების მიხედვით',
          'topChart'
        );
      });
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
      valueAxis.title.text = 'ვიზიტები';
    }
    if (this.lang == 'ENG') {
      valueAxis.title.text = 'Visits';
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

    if (this.lang == 'GEO') {
      ser = this.createSeries('void', 'სულ', chart, 'სულ');
    } else {
      ser = this.createSeries('void', 'All', chart, 'All');
    }

    Object.keys(res[0])
      .filter((x) => x != 'year')
      .forEach((element: string) => {
        this.createSeries(element, element, chart, element);
      });

    chart.legend = new am4charts.Legend();

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

    let legendContainer = am4core.create('legenddiv', am4core.Container);
    legendContainer.width = am4core.percent(100);
    legendContainer.height = am4core.percent(100);
    legendContainer.logo.disabled = true;
    chart.legend.parent = legendContainer;

    // chart.legend.maxHeight = 50;
    // chart.legend.scrollable = true;

    chart.legend.useDefaultMarker = true;
    // let marker = chart.legend.markers.template.children.getIndex(0);
    // marker.cornerRadius(7, 7, 7, 7);
    // marker.strokeWidth = 2;
    // marker.strokeOpacity = 1;
    // marker.stroke = am4core.color("#ccc");
    // marker.template.

    //chart.cursor = new am4charts.XYCursor();

    //chart.legend.markers.template.disabled = true;

    chart.logo.disabled = true;
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.filePrefix =
      this.lang === 'EN'
        ? 'Top 10 Countries By Number of Visits'
        : 'ტოპ 10 ქვეყანა ვიზიტების რაოდენობის მიხედვით';

    chart.exporting.menu.items[0].icon =
      '../../../assets/HomePage/download_icon.svg';
    chart.exporting.menu.align = 'right';
    chart.exporting.menu.verticalAlign = 'top';
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
    chart.numberFormatter.numberFormat = '#';
    chart.logo.disabled = true;

    let scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX = scrollbarX;

    series.strokeWidth = 2;
    series.tensionX = 0.7;

    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.stroke = am4core.color('#fff');
    bullet.circle.strokeWidth = 2;

    if (this.lang == 'GEO') {
      bullet.tooltipText =
        '[bold]{name}[/]დან ვიზიტების რაოდენობა, საწყის პერიოდთან შედარებით,\n{year} წელს შეიცვალა [bold]{valueY.formatNumber("#.%")}-ით';
    }
    if (this.lang == 'ENG') {
      bullet.tooltipText =
        'From [bold]{name}[/] Number Of Visits, Compared to\n{year} Year, Has Changed By [bold]{valueY.formatNumber("#.%")}';
    }

    let shadow = new am4core.DropShadowFilter();
    shadow.dx = 1;
    shadow.dy = 1;
    bullet.filters.push(shadow);

    // series.template.tooltipText = "{name}: {categoryX}: {valueY}";

    return series;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    am4core.disposeAllCharts();
  }
}
