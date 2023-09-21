import { Component, OnInit } from '@angular/core';
import { CompareIndicatorsComponent } from '../compare-indicators.component';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-default-var',
  templateUrl: './default-var.component.html',
  styleUrls: ['./default-var.component.scss'],
})
export class DefaultVarComponent implements OnInit {
  constructor(private tst: CompareIndicatorsComponent) {}

  ngOnInit(): void {
    this.createChart();
    this.createCharta();
    this.createChartb();
  }
  getDetailedPage() {
    this.tst.hidemain = true;
  }
  arrayChart: any = [
    {
      network: 'Facebook',
      MAU: 2255250000,
    },
    {
      network: 'Google+',
      MAU: 430000000,
    },
    {
      network: 'Instagram',
      MAU: 1000000000,
    },
    {
      network: 'Pinterest',
      MAU: 246500000,
    },
    {
      network: 'Reddit',
      MAU: 355000000,
    },
    {
      network: 'TikTok',
      MAU: 500000000,
    },
    {
      network: 'Tumblr',
      MAU: 624000000,
    },
    {
      network: 'Twitter',
      MAU: 329500000,
    },
    {
      network: 'WeChat',
      MAU: 1000000000,
    },
    {
      network: 'Weibo',
      MAU: 431000000,
    },
    {
      network: 'Whatsapp',
      MAU: 1433333333,
    },
    {
      network: 'YouTube',
      MAU: 1900000000,
    },
  ];

  createChart() {
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create('chart1', am4charts.XYChart);
    chart.padding(40, 40, 40, 40);

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = 'network';
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = 'network';
    series.dataFields.valueX = 'MAU';
    series.tooltipText = '{valueX.value}';
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;
    chart.data = this.arrayChart;

    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.horizontalCenter = 'left';
    labelBullet.label.dx = 10;
    labelBullet.label.text =
      "{values.valueX.workingValue.formatNumber('#.0as')}";
    labelBullet.locationX = 1;
    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add('fill', (fill: any, target: any) => {
      return chart.colors.getIndex(target.dataItem.index);
    });

    categoryAxis.sortBySeries = series;
  }
  createCharta() {
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create('chart2', am4charts.XYChart);
    chart.padding(40, 40, 40, 40);

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = 'network';
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = 'network';
    series.dataFields.valueX = 'MAU';
    series.tooltipText = '{valueX.value}';
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;
    chart.data = this.arrayChart;

    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.horizontalCenter = 'left';
    labelBullet.label.dx = 10;
    labelBullet.label.text =
      "{values.valueX.workingValue.formatNumber('#.0as')}";
    labelBullet.locationX = 1;
    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add('fill', (fill: any, target: any) => {
      return chart.colors.getIndex(target.dataItem.index);
    });

    categoryAxis.sortBySeries = series;
  }
  createChartb() {
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create('chart3', am4charts.XYChart);
    chart.padding(40, 40, 40, 40);

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = 'network';
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = 'network';
    series.dataFields.valueX = 'MAU';
    series.tooltipText = '{valueX.value}';
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;
    chart.data = this.arrayChart;

    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.horizontalCenter = 'left';
    labelBullet.label.dx = 10;
    labelBullet.label.text =
      "{values.valueX.workingValue.formatNumber('#.0as')}";
    labelBullet.locationX = 1;
    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add('fill', (fill: any, target: any) => {
      return chart.colors.getIndex(target.dataItem.index);
    });

    categoryAxis.sortBySeries = series;
  }
}
