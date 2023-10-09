import { Component, OnDestroy, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { IDropDown } from 'src/app/common/IDropDown';
import { DefindicatorService } from './service/defindicator.service';
import { HttpClient } from '@angular/common/http';
import { DataForMapChart } from './service/dataForMapChart';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-ht-default-indicators',
  templateUrl: './ht-default-indicators.component.html',
  styleUrls: ['./ht-default-indicators.component.scss'],
})
export class HtDefaultIndicatorsComponent implements OnInit, OnDestroy {
  readonly APIUrl: string = 'https://tourismapi.geostat.ge/api/Hotels';

  unsubscribe$ = new Subject<void>();

  constructor(private srvc: DefindicatorService, private http: HttpClient) {
    this.lang = localStorage.getItem('Language');

    this.indicators = this.srvc.indicators;
    this.indicator = this.indicators[0].value;

    this.GetRegions();
    this.GetContryGroups();

    this.srvc
      .getGenders()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        res.forEach((element: string) => {
          this.genders.push(element);
        });
      });

    this.srvc
      .getHotelTypes()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        res.forEach((element: string) => {
          this.hotelTypes.push(element);
        });
      });

    this.srvc
      .getRoomTypes()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        res.forEach((element: string) => {
          this.roomTypes.push(element);
        });
      });
  }

  hotelTypes: string[] = [];
  genders: string[] = [];
  roomTypes: string[] = [];

  GetRegions() {
    this.srvc
      .GetRegions()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        for (const key of Object.keys(res)) {
          if (res[key] != 12 && res[key] != 13) {
            this.regions.push({
              name: key,
              value: res[key],
              isDisabled: false,
            });
          }
        }
      });
  }

  GetContryGroups() {
    this.srvc
      .GetCountryGroup()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        for (const key of Object.keys(res)) {
          this.countryGroups.push({
            name: key,
            value: res[key],
            isDisabled: false,
          });
        }
      });
  }

  status: number = 0;
  clickEvent(id: number) {
    this.status = id;
  }

  lang: any;

  ngOnInit(): void {
    this.srvc
      .getYears()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((arg) => {
        this.years = arg;

        this.year = arg[0];

        this.getMainChart();
      });

    this.getAllHelpCharts();

    if (this.lang == 'GEO') {
      this.sankyChart = 'სასტუმროების რაოდენობის განაწილება';
    }
    if (this.lang == 'ENG') {
      this.sankyChart = 'Distribution of the Hotels';
    }
  }

  regions: IDropDown[] = [];
  region: IDropDown = { name: 'სულ', value: 0, isDisabled: false };

  countryGroups: IDropDown[] = [];

  indicator!: number;
  indicators!: IDropDown[];

  years: number[] = [];
  year: number = 0;

  optList: string = '1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11';

  addRemoveRegion() {
    let list: string[] = [];
    this.regions.forEach((reg) => {
      if ((document.getElementById(reg.name) as HTMLInputElement).checked) {
        if (reg.value) {
          list.push(String(reg.value));
        }
      }
    });
    if (list.length === 0) {
      list = ['1', '2', '3', '4', '5', '6', '8', '9', '10', '11'];
    }
    this.optList = list.join();

    am4core.disposeAllCharts();

    if ((document.getElementById('HotelsAmount') as HTMLInputElement).checked) {
      this.getMainChart();
    } else if (
      (document.getElementById('VisitorsAmount') as HTMLInputElement).checked
    ) {
      this.getMainChartGuests();
    }

    this.getAllHelpCharts();
  }

  hotel() {
    this.getMainChart();

    if (this.lang == 'GEO') {
      this.sankyChart = 'სასტუმროების რაოდენობის განაწილება';
    }
    if (this.lang == 'ENG') {
      this.sankyChart = 'Distribution of the Hotels';
    }
  }

  guest() {
    this.getMainChartGuests();

    if (this.lang == 'GEO') {
      this.sankyChart = 'სტუმრების რაოდენობის განაწილება';
    }
    if (this.lang == 'ENG') {
      this.sankyChart = 'Distribution of the Visitors';
    }
  }

  checkUncheckAll(event: any) {
    if (event.target.checked) {
      this.regions.forEach(
        (reg) =>
          ((document.getElementById(reg.name) as HTMLInputElement).checked =
            true)
      );
    } else {
      this.regions.forEach(
        (reg) =>
          ((document.getElementById(reg.name) as HTMLInputElement).checked =
            false)
      );
    }

    this.addRemoveRegion();
  }

  helpChartName: any;

  // name : string = 'აირჩიეთ რეგიონი';
  // hoverName : string = 'აირჩიეთ რეგიონი';

  selectedRegion: number = 0;
  // tooltipx: number = 0;
  // tooltipy: number = 0;

  sankyChart!: string;

  yearChange() {
    if ((document.getElementById('HotelsAmount') as HTMLInputElement).checked) {
      this.getMainChart();
    } else if (
      (document.getElementById('VisitorsAmount') as HTMLInputElement).checked
    ) {
      this.getMainChartGuests();
    }
  }

  getMainChart() {
    this.srvc
      .getMainChartData(this.optList, this.year)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.mainChart(res);
      });
  }

  getMainChartGuests() {
    this.srvc
      .getMainChartDataGuests(this.optList, this.year)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.mainChart(res);
      });
  }

  getHotelCountChart() {
    this.srvc
      .getDataForHotelCount(this.optList)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.helpChart(res, this.helpChartName, 'chartHotelCount');
      });
  }

  getIncomeChart() {
    this.srvc
      .getDataForIncoms(this.optList)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.helpChart(res, this.helpChart, 'chartRevenue');
      });
  }

  getCoastChart() {
    this.srvc
      .getDataForCoasts(this.optList)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.helpChart(res, this.helpChart, 'chartCoast');
      });
  }

  getEmloyeChart() {
    this.srvc
      .getDataForGender(this.optList)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.helpChart(res, this.helpChart, 'chartGender');
      });
  }

  getGuestsChart() {
    this.srvc
      .getDataForGuestCount(this.optList)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.helpChart(res, this.helpChart, 'chartGestCount');
      });
  }

  getBadRoomChart() {
    this.srvc
      .getDataForRoomBad(this.optList)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.helpChart(res, this.helpChart, 'chartBadRoom');
      });
  }

  getAllHelpCharts() {
    this.getHotelCountChart();
    this.getIncomeChart();
    this.getCoastChart();
    this.getEmloyeChart();
    this.getGuestsChart();
    this.getBadRoomChart();
  }

  mainChart(data: DataForMapChart[]) {
    var newData = data.filter(function (el) {
      return el.value != 0;
    });

    // newData.map((i: any) => {
    //   i.from = i.from.split('_').join(' ');
    //   i.to = i.to.split('_').join(' ');
    // });

    let chart = am4core.create('chartMain', am4charts.SankeyDiagram);
    chart.hiddenState.properties.opacity = 0;
    chart.data = newData;

    let hoverState = chart.links.template.states.create('hover');
    hoverState.properties.fillOpacity = 0.6;
    chart.dataFields.fromName = 'from';
    chart.dataFields.toName = 'to';
    chart.dataFields.value = 'value';

    chart.paddingRight = 130;
    let nodeTemplate = chart.nodes.template;
    nodeTemplate.inert = true;
    nodeTemplate.readerTitle = 'Drag me!';
    nodeTemplate.showSystemTooltip = true;
    nodeTemplate.width = 20;
    nodeTemplate.fontSize = 11;

    let nodeTemplate2 = chart.nodes.template;
    nodeTemplate2.readerTitle = 'Click to show/hide or drag to rearrange';
    nodeTemplate2.showSystemTooltip = true;
    nodeTemplate2.cursorOverStyle = am4core.MouseCursorStyle.pointer;
    nodeTemplate2.fontSize = 11;

    chart.logo.disabled = true;
  }

  helpChart(res: any, chart: any, chartDiv: string) {
    // Themes end

    // Create chart instance
    chart = am4core.create(chartDiv, am4charts.XYChart);
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'year';
    categoryAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // valueAxis.renderer.inside = true;
    // valueAxis.renderer.labels.template.disabled = true;
    valueAxis.numberFormatter = new am4core.NumberFormatter();
    valueAxis.numberFormatter.numberFormat = '#.0a';
    valueAxis.renderer.grid.template.location = 0;
    valueAxis.min = 0;
    chart.data = res;
    chart.colors.list = [
      am4core.color('#2330A4'),
      am4core.color('#FDA241'),
      am4core.color('#FF7EAE'),
      am4core.color('#CBBAED'),
      am4core.color('#F5F3BB'),
      am4core.color('#86BA90'),
      am4core.color('#2A92A4'),
      am4core.color('#6A1AA4'),
      am4core.color('#33A450'),
      am4core.color('#A42030'),
    ];

    switch (chartDiv) {
      case 'chartHotelCount':
        this.hotelTypes.forEach((element) => {
          this.createSeries(element, element, chart, element);
        });
        chart.exporting.filePrefix =
          this.lang === 'EN'
            ? 'Number of Hotels (Unit)'
            : 'სასტუმროების რაოდენობა (ერთეული)';
        break;

      case 'chartBadRoom':
        this.roomTypes.forEach((element) => {
          this.createSeries(element, element, chart, element);
        });

        if (this.lang == 'GEO') {
          this.createLineSeries('სულ', 'ადგილების რაოდენობა', chart, 'ადგილი');
        } else {
          this.createLineSeries(
            'Total',
            'Number of Bed-places',
            chart,
            'Bed-places'
          );
        }

        chart.exporting.filePrefix =
          this.lang === 'EN'
            ? 'Number of Rooms and Bed-places (Unit)'
            : 'ნომრებისა და ადგილების რაოდენობა (ერთეული)';
        break;

      case 'chartGestCount':
        this.countryGroups.forEach((reg) => {
          this.createSeries(reg.name, reg.name, chart, reg.name);
        });
        chart.exporting.filePrefix =
          this.lang === 'EN'
            ? 'Number of Guests (Unit)'
            : 'სტუმრების რაოდენობა (ერთეული)';
        break;

      case 'chartRevenue':
        if (this.lang == 'GEO') {
          this.createSeries(
            'ოთახები',
            'ნომრების გაქირავება',
            chart,
            'ნომრების გაქირავებიდან'
          );
          this.createSeries('სერვისი', 'სერვისი', chart, 'სერვისიდან');
          this.createSeries('რესტორანი', 'რესტორანი', chart, 'რესტორნიდან');
          this.createSeries('სხვა', 'სხვა', chart, 'სხვა');
        }
        if (this.lang == 'ENG') {
          this.createSeries('Rooms', 'Renting ', chart, 'From Renting');
          this.createSeries('Service', 'Service', chart, 'From Service');
          this.createSeries(
            'Restaurant',
            'Restaurant',
            chart,
            'From Restaurant'
          );
          this.createSeries('Other', 'Other', chart, 'Other');
        }
        chart.exporting.filePrefix =
          this.lang === 'EN'
            ? 'Income (Thousand GEL)'
            : 'შემოსავლების მოცულობა (ათასი ლარი)';
        break;

      case 'chartGender':
        this.genders.forEach((element) => {
          this.createSeries(element, element, chart, element);
        });
        chart.exporting.filePrefix =
          this.lang === 'EN'
            ? 'Employees (Person)'
            : 'დასაქმებულების რაოდენობა (კაცი)';
        break;

      case 'chartCoast':
        if (this.lang == 'GEO') {
          this.createSeries('ხელფასი', 'ხელფასი', chart, 'ხელფასები');
          this.createSeries('სხვა', 'სხვა', chart, 'სხვა ხარჯები');
        }
        if (this.lang == 'ENG') {
          this.createSeries('Salary', 'Salary', chart, 'Salary');
          this.createSeries('Other', 'Other', chart, 'Other');
        }
        chart.exporting.filePrefix =
          this.lang === 'EN'
            ? 'Expenditures (Thousand GEL)'
            : 'ხარჯების მოცულობა (ათასი ლარი)';
        break;

      default:
        break;
    }

    chart.legend = new am4charts.Legend();

    chart.legend.maxHeight = 80;
    chart.legend.maxWidth = 80;
    chart.legend.scrollable = true;

    chart.legend.useDefaultMarker = true;
    let marker = chart.legend.markers.template.children.getIndex(0);
    marker.cornerRadius(12, 12, 12, 12);
    marker.strokeWidth = 1;
    marker.strokeOpacity = 1;
    // marker.stroke = am4core.color('#ccc');

    chart.exporting.menu = new am4core.ExportMenu();

    chart.exporting.menu.items[0].icon =
      '../../../assets/HomePage/download_icon.svg';
    chart.exporting.menu.align = 'right';
    chart.exporting.menu.verticalAlign = 'top';
  }

  createSeries(field: string, name: string, chart: any, ragac: string) {
    // Set up series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.name = name;
    series.dataFields.valueY = field;
    series.dataFields.categoryX = 'year';
    series.sequencedInterpolation = true;

    chart.language.locale['_thousandSeparator'] = ' ';
    chart.numberFormatter.numberFormat = '#.';
    chart.logo.disabled = true;

    // Make it stacked
    series.stacked = true;

    // Configure columns
    series.columns.template.width = am4core.percent(60);
    if (this.lang == 'GEO') {
      series.columns.template.tooltipText =
        '{categoryX} წელს: [bold]{valueY.formatNumber("#,###.")} ' + ragac;
    }
    if (this.lang == 'ENG') {
      series.columns.template.tooltipText =
        '{categoryX} Year: [bold]{valueY.formatNumber("#,###.")} ' + ragac;
    }

    // Add label
    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = '{valueY.formatNumber("#,###.")}';
    labelBullet.locationY = 0.5;
    labelBullet.label.hideOversized = true;
    labelBullet.label.hide();

    return series;
  }

  createLineSeries(field: string, name: string, chart: any, ragac: string) {
    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.name = name;
    lineSeries.dataFields.valueY = field;
    lineSeries.dataFields.categoryX = 'year';

    lineSeries.stroke = am4core.color('#fdd400');
    lineSeries.strokeWidth = 3;
    lineSeries.propertyFields.strokeDasharray = 'lineDash';
    lineSeries.tooltip.label.textAlign = 'middle';

    let bullet = lineSeries.bullets.push(new am4charts.Bullet());
    bullet.fill = am4core.color('#fdd400'); // tooltips grab fill from parent by default
    if (this.lang == 'GEO') {
      bullet.tooltipText =
        '{categoryX} წელს: [bold]{valueY.formatNumber("#,###.")} ' + ragac;
    }
    if (this.lang == 'ENG') {
      bullet.tooltipText =
        '{categoryX} Year: [bold]{valueY.formatNumber("#,###.")} ' + ragac;
    }

    let circle = bullet.createChild(am4core.Circle);
    circle.radius = 4;
    circle.fill = am4core.color('#fff');
    circle.strokeWidth = 3;
    return lineSeries;
  }

  // if(this.lang === 'GEO'){
  //   // @ts-expect-error
  //   return regions['ka'].reg
  // }if(this.lang === 'EN'){
  //   // @ts-expect-error
  //   return regions['en'].reg
  // }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    am4core.disposeAllCharts();
  }
}
