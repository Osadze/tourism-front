import { Component, OnDestroy, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import * as am4charts from '@amcharts/amcharts4/charts';
import { RegionService } from './service/region.service';
import { DataForMapChart } from './service/dataForMapChart';
import { HttpClient } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import { IDropDown } from 'src/app/common/IDropDown';

@Component({
  selector: 'app-regional-analysis',
  templateUrl: './regional-analysis.component.html',
  styleUrls: ['./regional-analysis.component.scss'],
})
export class RegionalAnalysisComponent implements OnInit, OnDestroy {
  readonly APIUrl: string = 'https://tourismapi.geostat.ge/api/region';

  unsubscribe$ = new Subject<void>();

  constructor(private region: RegionService) {
    this.radioBtnID = '0';
    this.tourismType = 2;
    this.all = [];
    // this.ages = this.region.ages;
    // this.genders = this.region.genders();
    this.goals = this.region.goals();
    this.visits = this.region.visits();
    this.transports = this.region.transports();
    this.rates = this.region.rates();
    this.optArray = '';
    this.flag = 'visits';
    this.selectedProperty = 'All';
    this.isValue = 1;

    this.isDetaled = [
      false,
      this.isGenderDetailed,
      this.isAgeDetailed,
      this.isPurposeDetailed,
      this.isRateDetaled,
      this.isActivityDetailed,
      this.isTransportDetailed,
    ];

    this.lang = localStorage.getItem('Language');
  }

  lang: any;

  ngOnInit(): void {
    this.region
      .getYears(2)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((years) => {
        this.years = years;

        this.year = years[0];

        this.getMapChart(
          this.tourismType,
          this.year,
          this.optArray,
          this.isValue,
          this.selectedProperty,
          this.flag
        );
      });

    this.region
      .GetGenders()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        for (const key of Object.keys(res)) {
          this.Genders.push({ name: key, value: res[key], isDisabled: false });
        }
      });

    this.region
      .GetAges()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        for (const key of Object.keys(res)) {
          this.Ages.push({ name: key, value: res[key], isDisabled: false });
        }
      });

    this.checkBoxesArray = [
      this.all,
      this.Genders,
      this.Ages,
      this.goals,
      this.rates,
      this.visits,
      this.transports,
    ];
  }

  Genders: IDropDown[] = [];

  Ages: IDropDown[] = [];

  years!: number[];

  year: number = 0;

  radioBtnID!: string;

  all: IDropDown[] = [];
  activityes: IDropDown[] = [];
  goals: IDropDown[] = [];
  visits: IDropDown[] = [];
  transports: IDropDown[] = [];
  rates: IDropDown[] = [];
  regionId: number = 1;

  optArray!: string;

  checkBoxesArray!: any[];
  isDetaled!: any[];

  selectedProperty!: string;

  mapChartTitle: string = '';

  expenceTitle: string = '';

  sanqiName: string = '';

  //optionList: number[] = [];

  tourismType!: number;

  regList!: DataForMapChart[];

  regions: any = [];
  selectedRegion: string = '';

  regionCodesGE: any = {
    თბილისი: 1,
    იმერეთი: 4,
    'შიდა ქართლი': 11,
    'აჭარის ა/რ': 2,
    'სამცხე-ჯავახეთი': 9,
    'ქვემო ქართლი': 10,
    'მცხეთა-მთიანეთი': 6,
    გურია: 3,
    კახეთი: 5,
    'რაჭა-ლეჩხუმი და ქვემო სვანეთი': 7,
    'სამეგრელო-ზემო სვანეთი': 8,
  };

  regionCodesEN: any = {
    Tbilisi: 1,
    Imereti: 4,
    'Shida Kartli': 11,
    'Adjara A/R': 2,
    'Samtskhe-Javakheti': 9,
    'Kvemo Kartli': 10,
    'Mtsketa-Mtianeti': 6,
    Guria: 3,
    Kakheti: 5,
    'Racha-Lechkhumi and Kvemo Svaneti': 7,
    'Samegrelo-Zemo Svaneti': 8,
  };

  changeYear() {
    this.createCharts();
  }

  setTourismType(num: number) {
    this.optArray = '';

    this.tourismType = num;

    if (num == 2) {
      this.region
        .getYears(2)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((years) => {
          this.years = years;
        });
    } else if (num == 1) {
      this.region
        .getYears(1)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((years) => {
          this.years = years;
        });
    }

    this.createCharts();
  }

  flag!: string;

  changeFlag(flag: string) {
    this.flag = flag;

    this.createCharts();
  }

  isValue!: number;

  activeOrNot(val: number) {
    am4core.disposeAllCharts();

    if (val == 2) {
      let radioBtn = document.getElementById('ttype2') as HTMLInputElement;

      radioBtn.checked = true;
    }

    this.optArray = '';
    this.selectedProperty = 'All';

    let radioBtn = document.getElementById('0') as HTMLInputElement;

    this.checkBoxesArray[Number(this.radioBtnID)].forEach(
      (element: IDropDown) => (element.isDisabled = false)
    );

    let oldRadioBtn = document.getElementById(
      this.radioBtnID
    ) as HTMLInputElement;

    oldRadioBtn.checked = false;

    radioBtn.checked = true;

    this.radioBtnID = '0';

    this.isDetaled.forEach((element) => (element = false));

    this.isValue = val;
    if (val == 1) {
      this.tourismType = 2;

      this.region
        .getYears(2)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((years) => {
          this.years = years;
        });

      this.getMapChart(
        this.tourismType,
        this.year,
        this.optArray,
        this.isValue,
        this.selectedProperty,
        this.flag
      );
    } else {
      this.tourismType = 1;

      this.region
        .getYears(1)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((years) => {
          this.years = years;
        });

      this.getMapChart(
        this.tourismType,
        this.year,
        this.optArray,
        this.isValue,
        this.selectedProperty,
        this.flag
      );
      this.getExpenceChart(this.optArray, this.selectedProperty, this.regionId);
      this.getMigrationChart(this.year, this.optArray, this.selectedProperty);
    }
  }

  createCharts() {
    am4core.disposeAllCharts();

    if (this.isValue == 1) {
      if (this.tourismType == 1) {
        this.getMapChart(
          this.tourismType,
          this.year,
          this.optArray,
          this.isValue,
          this.selectedProperty,
          this.flag
        );

        this.getMigrationChart(this.year, this.optArray, this.selectedProperty);
      } else {
        this.getMapChart(
          this.tourismType,
          this.year,
          this.optArray,
          this.isValue,
          this.selectedProperty,
          this.flag
        );
      }
    } else {
      if (
        this.selectedProperty != 'TransportType' &&
        this.selectedProperty != 'VisitActivity'
      ) {
        this.getMapChart(
          this.tourismType,
          this.year,
          this.optArray,
          this.isValue,
          this.selectedProperty,
          this.flag
        );

        this.getExpenceChart(
          this.optArray,
          this.selectedProperty,
          this.regionId
        );

        this.getMigrationChart(this.year, this.optArray, this.selectedProperty);
      } else {
        this.getMapChart(
          this.tourismType,
          this.year,
          this.optArray,
          this.isValue,
          this.selectedProperty,
          this.flag
        );

        this.getExpenceChart('', 'All', this.regionId);

        this.getMigrationChart(this.year, '', 'All');
      }
    }
  }

  isGenderDetailed: boolean = false;

  detailedGender() {
    this.isGenderDetailed = !this.isGenderDetailed;
    this.selectedProperty = 'Gender';
  }

  isAgeDetailed: boolean = false;

  detailedAge() {
    this.isAgeDetailed = !this.isAgeDetailed;
    this.selectedProperty = 'AgeGroup';
  }

  isPurposeDetailed: boolean = false;
  detailedPurpose() {
    this.isPurposeDetailed = !this.isPurposeDetailed;
    this.selectedProperty = 'GoalType';
  }

  isActivityDetailed: boolean = false;
  detailedActivity() {
    this.isActivityDetailed = !this.isActivityDetailed;
    this.selectedProperty = 'VisitActivity';
  }

  isTransportDetailed: boolean = false;
  detailedTransport() {
    this.isTransportDetailed = !this.isTransportDetailed;
    this.selectedProperty = 'TransportType';
  }

  isRateDetaled: boolean = false;
  detaledRate() {
    this.isRateDetaled = !this.isRateDetaled;
    this.selectedProperty = 'RateType';
  }

  checkBoxClic(event: any) {
    let selectedID: string = (event.target as Element).id.slice(-1);

    let radioBtn = document.getElementById(selectedID) as HTMLInputElement;

    (document.getElementById(this.radioBtnID) as HTMLInputElement).checked =
      false;

    if (selectedID != this.radioBtnID) {
      this.checkBoxesArray[Number(this.radioBtnID)].forEach(
        (element: IDropDown) => (element.isDisabled = false)
      );

      radioBtn.checked = true;

      this.isDetaled[Number(this.radioBtnID)] = false;

      this.radioBtnID = selectedID;

      switch (this.radioBtnID) {
        case '0':
          this.selectedProperty = 'All';
          break;

        case '1':
          this.selectedProperty = 'Gender';
          break;

        case '2':
          this.selectedProperty = 'AgeGroup';
          break;

        case '3':
          this.selectedProperty = 'GoalType';
          break;

        case '4':
          this.selectedProperty = 'RateType';
          break;

        case '5':
          this.selectedProperty = 'VisitActivity';
          break;

        case '6':
          this.selectedProperty = 'TransportType';
          break;

        default:
          break;
      }
    } else {
      if (radioBtn.checked != true) {
        radioBtn.checked = true;
      }
    }

    if (
      this.selectedProperty == 'TransportType' ||
      this.selectedProperty == 'VisitActivity'
    ) {
      (document.getElementById('RdbVisits') as HTMLInputElement).checked = true;
      (document.getElementById('RdbNights') as HTMLInputElement).disabled =
        true;
    } else {
      (document.getElementById('RdbNights') as HTMLInputElement).disabled =
        false;
    }

    this.optArray = '';

    this.checkBoxesArray[Number(selectedID)].forEach((element: IDropDown) => {
      if (element.isDisabled == true) {
        if (this.optArray.length == 0) {
          this.optArray = String(element.value);
        } else {
          this.optArray += ',' + String(element.value);
        }
      }
    });

    this.createCharts();

    return this.optArray;
  }

  RDBClick(event: any) {
    let elementId: string = (event.target as Element).id;

    (document.getElementById('RdbNights') as HTMLInputElement).disabled = false;

    if (elementId === '6' || elementId === '5') {
      (document.getElementById('RdbNights') as HTMLInputElement).disabled =
        true;
      (document.getElementById('RdbVisits') as HTMLInputElement).checked = true;
    }

    let indx = Number(elementId);

    this.checkBoxesArray[indx].forEach(
      (element: IDropDown) => (element.isDisabled = true)
    );

    this.checkBoxesArray[Number(this.radioBtnID)].forEach(
      (element: IDropDown) => (element.isDisabled = false)
    );

    this.isDetaled[Number(this.radioBtnID)] = false;

    (document.getElementById(this.radioBtnID) as HTMLInputElement).checked =
      false;

    this.radioBtnID = elementId;

    this.isDetaled[Number(this.radioBtnID)] = true;

    switch (this.radioBtnID) {
      case '0':
        this.selectedProperty = 'All';
        break;

      case '1':
        this.selectedProperty = 'Gender';
        break;

      case '2':
        this.selectedProperty = 'AgeGroup';
        break;

      case '3':
        this.selectedProperty = 'GoalType';
        break;

      case '4':
        this.selectedProperty = 'RateType';
        break;

      case '5':
        this.selectedProperty = 'VisitActivity';
        break;

      case '6':
        this.selectedProperty = 'TransportType';
        break;

      default:
        break;
    }

    this.optArray = '';

    if (indx != 0) {
      this.checkBoxesArray[indx].forEach((element: IDropDown) => {
        if (element.isDisabled == true) {
          if (this.optArray.length == 0) {
            this.optArray = String(element.value);
          } else {
            this.optArray += ',' + String(element.value);
          }
        }
      });
    } else {
      this.optArray = '';
    }

    this.createCharts();

    return this.optArray;
  }

  getMapChart(
    tType: number,
    yr: number,
    opt: string,
    inOut: number,
    byProp: string,
    fl: string
  ) {
    let title: string = '';
    let title1: string = '';

    if (this.lang == 'GEO') {
      title = 'ვიზიტების რაოდენობა (ათასი)';
      title1 = 'ღამეების საშუალო რაოდენობა';
      if (this.selectedRegion === 'გურია') {
        this.expenceTitle = `ხარჯები (ათასი ლარი) - გურიის რეგიონი`;
      } else {
        this.expenceTitle = `ხარჯები (ათასი ლარი) - ${
          this.selectedRegion ? this.selectedRegion + 'ს' : 'თბილისის'
        } რეგიონი`;
      }
    }
    if (this.lang == 'ENG') {
      title = 'Number of Visits (Thousands)';
      title1 = 'Average Number of Nights';
      this.expenceTitle = `Expenses (Thousands) - Region Of ${
        this.selectedRegion ? this.selectedRegion : 'Tbilisi'
      } `;
    }

    if (this.flag == 'visits') {
      this.region
        .getDataForMapChart(tType, yr, opt, inOut, byProp, fl)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => {
          this.createMapChart(title, res);
        });
    } else {
      this.region
        .getDataForMapChart(tType, yr, opt, inOut, byProp, fl)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => {
          this.createMapChart(title1, res);
        });
    }
  }

  createMapChart(title: any, res: DataForMapChart[]) {
    // am4core.useTheme(am4themes_animated);
    let chart = am4core.create('chart1', am4maps.MapChart);

    // chart.colors.step = 3;;
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

    // chart.titles.create().text = title;

    this.mapChartTitle = title;

    chart.geodataSource.url =
      'https://www.amcharts.com/lib/4/geodata/json/georgiaSouthOssetiaHigh.json';

    chart.geodataSource.events.on('parseended', function () {
      polygonSeries.data = [
        res[0],
        res[1],
        res[2],
        res[3],
        res[4],
        res[5],
        // res[6],
        res[7],
        res[8],
        res[9],
        res[10],
      ];
      polygonSeries1.data = [res[11], res[12]];
      polygonSeries2.data = [res[6]];
    });

    // Export
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.filePrefix = this.mapChartTitle;
    chart.exporting.dataFields = {
      name: 'Region',
      value: 'Value',
    };
    chart.exporting.menu.items[0].icon =
      '../../../assets/HomePage/download_icon.svg';
    chart.exporting.menu.align = 'right';
    chart.exporting.menu.verticalAlign = 'top';
    chart.exporting.adapter.add('data', function (data) {
      data.data = [];
      for (var i = 0; i < polygonSeries.data.length; i++) {
        var row = polygonSeries.data[i];
        data.data.push({
          qveyana: row.id,
          name: row.name,
          value: row.value,
        });
      }
      return data;
    });

    chart.projection = new am4maps.projections.Mercator();

    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.include = [
      'GE-SZ',
      'GE-TB',
      'GE-IM',
      'GE-SK',
      'GE-AJ',
      'GE-SJ',
      'GE-KK',
      'GE-MM',
      'GE-GU',
      'GE-KA',
    ];

    let polygonTemplate = polygonSeries.mapPolygons.template;

    polygonTemplate.tooltipText = '{name}: {value}';

    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: chart.colors.getIndex(0).brighten(1),
      max: chart.colors.getIndex(0).brighten(-0.3),
    });

    let polygonSeries1 = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries1.useGeodata = true;
    polygonSeries1.include = ['GE-SO', 'GE-AB'];

    let polygonTemplate1 = polygonSeries1.mapPolygons.template;

    polygonTemplate1.tooltipText = '{name}';
    polygonTemplate1.fill = am4core.color('#898a8a');

    let polygonSeries2 = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries2.useGeodata = true;
    polygonSeries2.include = ['GE-RL'];

    let polygonTemplate2 = polygonSeries2.mapPolygons.template;

    if (this.lang == 'GEO') {
      polygonTemplate2.tooltipText =
        '{name} - რეგიონის მონაცემები გაერთიანებულია იმერეთის რეგიონის მონაცემებთან';
    }
    if (this.lang == 'ENG') {
      polygonTemplate2.tooltipText =
        '{name} - The data of the region is combined with the data of the Imereti region';
    }

    polygonTemplate2.fill = am4core.color('#A38D5D');

    polygonTemplate.nonScalingStroke = true;
    polygonTemplate.strokeWidth = 1;

    let hs = polygonTemplate.states.create('hover');
    hs.properties.fill = chart.colors.getIndex(0).brighten(-0.5);

    chart.logo.disabled = true;
  }

  getExpenceChart(opt: string, byProp: string, regioni: number) {
    this.region
      .getDataForExpenceTable(opt, byProp, regioni)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        let data = res.sort(function (a: any, b: any) {
          return parseFloat(a.year) - parseFloat(b.year);
        });
        this.expenceChart(data);
      });
  }

  expenceChart(res: any = []) {
    let chart = am4core.create('chart2', am4charts.XYChart);
    let uniqueKeys = Object.keys(Object.assign({}, ...res)).filter(
      (item) => item !== 'year'
    );

    var dateAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    dateAxis.dataFields.category = 'year';
    dateAxis.numberFormatter.numberFormat = '#';
    dateAxis.renderer.grid.template.location = 0;
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.numberFormatter = new am4core.NumberFormatter();
    valueAxis.numberFormatter.numberFormat = '#';
    valueAxis.renderer.grid.template.location = 0;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.data = res;
    chart.legend = new am4charts.Legend();
    chart.logo.disabled = true;

    uniqueKeys.forEach((element: any) => {
      this.createSeries(element, element, chart);
    });

    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.items[0].icon =
      '../../../assets/HomePage/download_icon.svg';
    chart.exporting.filePrefix = this.expenceTitle;

    chart.exporting.menu.align = 'right';
    chart.exporting.menu.verticalAlign = 'top';

    chart.colors.list = [
      am4core.color('#2330A4'),
      am4core.color('#FDA241'),
      am4core.color('#FF7EAE'),
      am4core.color('#CBBAED'),
      am4core.color('#F5F3BB'),
      am4core.color('#86BA90'),
    ];
  }

  createSeries(field: string, name: string, chart: any) {
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = field;
    series.dataFields.categoryX = 'year';
    series.name = name;
    series.strokeWidth = 3;
    series.sequencedInterpolation = true;

    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.stroke = am4core.color('#fff');
    bullet.circle.strokeWidth = 2;

    if (this.lang == 'GEO') {
      bullet.tooltipText =
        '[bold]{name}[/]\n[font-size:14px]{categoryX} წელს: [bold]{valueY.formatNumber("#")} ათასი ₾';
    }
    if (this.lang == 'ENG') {
      bullet.tooltipText =
        '[bold]{name}[/]\n[font-size:14px]{categoryX} Year: [bold]{valueY.formatNumber("#")} Thousand ₾';
    }
    let shadow = new am4core.DropShadowFilter();
    shadow.dx = 1;
    shadow.dy = 1;
    bullet.filters.push(shadow);
    chart.logo.disabled = true;
    return series;
  }

  animateBullet(bullet: any, animateBullet: any) {
    let duration = 3000 * Math.random() + 2000;
    let animation = bullet.animate(
      [{ property: 'locationX', from: 0, to: 1 }],
      duration
    );
    animation.events.on('animationended', function (event: any) {
      animateBullet(event.target.object);
    });
  }

  getMigrationChart(year: number, opt: string, prop: string) {
    this.region
      .getDataForRegMigration(year, opt, prop)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.migrationChart(res);
      });
  }

  migrationChart(res: any) {
    // am4core.useTheme(am4themes_animated);
    let chart = am4core.create('chart22', am4charts.SankeyDiagram);
    let filtered = res.filter(
      (i: any) =>
        i.from !== 'რაჭა-ლეჩხუმი და ქვემო სვანეთი' &&
        i.from !== 'Racha-Lechkhumi and Kvemo Svaneti' &&
        i.from !== 'აფხაზეთის ა/რ' &&
        i.from !== 'Abkhazia A/R' &&
        i.from !== 'უცნობი' &&
        i.from !== 'Unknown'
    );

    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    const unique = [...new Set(filtered.map((item: any) => item.from))];
    this.regions = unique;
    if (this.selectedRegion.length === 0) {
      if (this.lang === 'GEO') {
        this.selectedRegion = 'თბილისი';
      }
      if (this.lang == 'ENG') {
        this.selectedRegion = 'Tbilisi';
      }
    }
    let result;
    if (this.isValue === 1) {
      result = res.filter(
        (item: any) => item.to === this.selectedRegion && item.value !== 0
      );
    } else {
      result = res.filter(
        (item: any) => item.from === this.selectedRegion && item.value !== 0
      );
    }

    chart.data = result;

    if (this.lang == 'GEO') {
      this.sanqiName = 'ვიზიტების რაოდენობა რეგიონების მიხედვით (ათასი)';
    }
    if (this.lang == 'ENG') {
      this.sanqiName = 'Number of Visits By Region (Thousand)';
    }

    let hoverState = chart.links.template.states.create('hover');
    hoverState.properties.fillOpacity = 0.6;
    chart.dataFields.fromName = 'from';
    chart.dataFields.toName = 'to';
    chart.dataFields.value = 'value';

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

    chart.paddingRight = 150;
    chart.paddingTop = 40;
    chart.paddingBottom = 40;

    let nodeTemplate = chart.nodes.template;
    nodeTemplate.inert = true;
    nodeTemplate.readerTitle = 'Drag me!';
    nodeTemplate.showSystemTooltip = true;

    let nodeTemplate2 = chart.nodes.template;
    nodeTemplate2.readerTitle = 'Click to show/hide or drag to rearrange';
    nodeTemplate2.showSystemTooltip = true;
    nodeTemplate2.cursorOverStyle = am4core.MouseCursorStyle.pointer;

    chart.logo.disabled = true;

    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.filePrefix = this.sanqiName;
    chart.exporting.menu.items[0].icon =
      '../../../assets/HomePage/download_icon.svg';
    chart.exporting.menu.align = 'right';
    chart.exporting.menu.verticalAlign = 'top';
  }

  changeRegion(ev: any) {
    let value = ev.target.value;

    if (this.lang === 'GEO') {
      this.regionId = this.regionCodesGE[value];
      this.expenceTitle = this.regionCodesGE[value];
    }
    if (this.lang == 'ENG') {
      this.regionId = this.regionCodesGE[value];
      this.expenceTitle = this.regionCodesEN[value];
    }
    this.createCharts();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    am4core.disposeAllCharts();
  }
}
