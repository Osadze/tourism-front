import { Component, OnInit } from '@angular/core';
import { CompareIndicatorsComponent } from '../compare-indicators.component';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-additional-var',
  templateUrl: './additional-var.component.html',
  styleUrls: ['./additional-var.component.scss'],
})
export class AdditionalVarComponent implements OnInit {
  constructor(private tst: CompareIndicatorsComponent) {}

  ngOnInit(): void {
    this.createChart();
    this.createChart2();
    this.createChart3();
  }

  getDetailedPage() {
    this.tst.hidemain = true;
  }

  createChart() {
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    chart.data = [
      {
        category: 'One',
        value1: 1,
        value2: 5,
        value3: 3,
      },
      {
        category: 'Two',
        value1: 2,
        value2: 5,
        value3: 3,
      },
      {
        category: 'Three',
        value1: 3,
        value2: 5,
        value3: 4,
      },
      {
        category: 'Four',
        value1: 4,
        value2: 5,
        value3: 6,
      },
      {
        category: 'Five',
        value1: 3,
        value2: 5,
        value3: 4,
      },
      {
        category: 'Six',
        value1: 2,
        value2: 13,
        value3: 1,
      },
    ];
    chart.colors.step = 2;
    chart.padding(30, 30, 10, 30);
    chart.legend = new am4charts.Legend();

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.grid.template.location = 0;
    // categoryAxis.renderer.inversed=true;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;
    valueAxis.calculateTotals = true;
    valueAxis.renderer.minWidth = 50;
    // valueAxis.renderer.opposite=true;
    let series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText =
      "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series1.name = 'Series 1';
    series1.dataFields.categoryY = 'category';
    series1.dataFields.valueX = 'value1';
    series1.dataFields.valueXShow = 'totalPercent';
    // series1.dataItems.template.locations.categoryX = 0.5;
    series1.stacked = true;
    // series1.tooltip.pointerOrientation = "vertical";

    let bullet1 = series1.bullets.push(new am4charts.LabelBullet());
    bullet1.interactionsEnabled = false;
    bullet1.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet1.label.fill = am4core.color('#ffffff');
    bullet1.locationX = 0.5;

    let series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.columns.template.width = am4core.percent(80);
    series2.columns.template.tooltipText =
      "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series2.name = 'Series 2';
    series2.dataFields.categoryY = 'category';
    series2.dataFields.valueX = 'value2';
    series2.dataFields.valueXShow = 'totalPercent';
    // series2.dataItems.template.locations.categoryX = 0.5;
    series2.stacked = true;
    // series2.tooltip.pointerOrientation = "vertical";

    let bullet2 = series2.bullets.push(new am4charts.LabelBullet());
    bullet2.interactionsEnabled = false;
    bullet2.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet2.locationX = 0.5;
    bullet2.label.fill = am4core.color('#ffffff');

    let series3 = chart.series.push(new am4charts.ColumnSeries());
    series3.columns.template.width = am4core.percent(80);
    series3.columns.template.tooltipText =
      "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series3.name = 'Series 3';
    series3.dataFields.categoryY = 'category';
    series3.dataFields.valueX = 'value3';
    series3.dataFields.valueXShow = 'totalPercent';
    // series3.dataItems.template.locations.categoryX = 0.5;
    series3.stacked = true;
    // series3.tooltip.pointerOrientation = "vertical";

    let bullet3 = series3.bullets.push(new am4charts.LabelBullet());
    bullet3.interactionsEnabled = false;
    bullet3.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet3.locationX = 0.5;
    bullet3.label.fill = am4core.color('#ffffff');

    chart.scrollbarX = new am4core.Scrollbar();
  }
  createChart2() {
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create('chartdiv2', am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    chart.data = [
      {
        category: 'One',
        value1: 1,
        value2: 5,
        value3: 3,
      },
      {
        category: 'Two',
        value1: 2,
        value2: 5,
        value3: 3,
      },
      {
        category: 'Three',
        value1: 3,
        value2: 5,
        value3: 4,
      },
      {
        category: 'Four',
        value1: 4,
        value2: 5,
        value3: 6,
      },
      {
        category: 'Five',
        value1: 3,
        value2: 5,
        value3: 4,
      },
      {
        category: 'Six',
        value1: 2,
        value2: 13,
        value3: 1,
      },
    ];
    chart.colors.step = 2;
    chart.padding(30, 30, 10, 30);
    chart.legend = new am4charts.Legend();

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.grid.template.location = 0;
    // categoryAxis.renderer.inversed=true;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;
    valueAxis.calculateTotals = true;
    valueAxis.renderer.minWidth = 50;
    // valueAxis.renderer.opposite=true;
    let series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText =
      "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series1.name = 'Series 1';
    series1.dataFields.categoryY = 'category';
    series1.dataFields.valueX = 'value1';
    series1.dataFields.valueXShow = 'totalPercent';
    // series1.dataItems.template.locations.categoryX = 0.5;
    series1.stacked = true;
    // series1.tooltip.pointerOrientation = "vertical";

    let bullet1 = series1.bullets.push(new am4charts.LabelBullet());
    bullet1.interactionsEnabled = false;
    bullet1.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet1.label.fill = am4core.color('#ffffff');
    bullet1.locationX = 0.5;

    let series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.columns.template.width = am4core.percent(80);
    series2.columns.template.tooltipText =
      "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series2.name = 'Series 2';
    series2.dataFields.categoryY = 'category';
    series2.dataFields.valueX = 'value2';
    series2.dataFields.valueXShow = 'totalPercent';
    // series2.dataItems.template.locations.categoryX = 0.5;
    series2.stacked = true;
    // series2.tooltip.pointerOrientation = "vertical";

    let bullet2 = series2.bullets.push(new am4charts.LabelBullet());
    bullet2.interactionsEnabled = false;
    bullet2.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet2.locationX = 0.5;
    bullet2.label.fill = am4core.color('#ffffff');

    let series3 = chart.series.push(new am4charts.ColumnSeries());
    series3.columns.template.width = am4core.percent(80);
    series3.columns.template.tooltipText =
      "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series3.name = 'Series 3';
    series3.dataFields.categoryY = 'category';
    series3.dataFields.valueX = 'value3';
    series3.dataFields.valueXShow = 'totalPercent';
    // series3.dataItems.template.locations.categoryX = 0.5;
    series3.stacked = true;
    // series3.tooltip.pointerOrientation = "vertical";

    let bullet3 = series3.bullets.push(new am4charts.LabelBullet());
    bullet3.interactionsEnabled = false;
    bullet3.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet3.locationX = 0.5;
    bullet3.label.fill = am4core.color('#ffffff');

    chart.scrollbarX = new am4core.Scrollbar();
  }
  createChart3() {
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create('chartdiv3', am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    chart.data = [
      {
        category: 'One',
        value1: 1,
        value2: 5,
        value3: 3,
      },
      {
        category: 'Two',
        value1: 2,
        value2: 5,
        value3: 3,
      },
      {
        category: 'Three',
        value1: 3,
        value2: 5,
        value3: 4,
      },
      {
        category: 'Four',
        value1: 4,
        value2: 5,
        value3: 6,
      },
      {
        category: 'Five',
        value1: 3,
        value2: 5,
        value3: 4,
      },
      {
        category: 'Six',
        value1: 2,
        value2: 13,
        value3: 1,
      },
    ];
    chart.colors.step = 2;
    chart.padding(30, 30, 10, 30);
    chart.legend = new am4charts.Legend();

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.grid.template.location = 0;
    // categoryAxis.renderer.inversed=true;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;
    valueAxis.calculateTotals = true;
    valueAxis.renderer.minWidth = 50;
    // valueAxis.renderer.opposite=true;
    let series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText =
      "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series1.name = 'Series 1';
    series1.dataFields.categoryY = 'category';
    series1.dataFields.valueX = 'value1';
    series1.dataFields.valueXShow = 'totalPercent';
    // series1.dataItems.template.locations.categoryX = 0.5;
    series1.stacked = true;
    // series1.tooltip.pointerOrientation = "vertical";

    let bullet1 = series1.bullets.push(new am4charts.LabelBullet());
    bullet1.interactionsEnabled = false;
    bullet1.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet1.label.fill = am4core.color('#ffffff');
    bullet1.locationX = 0.5;

    let series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.columns.template.width = am4core.percent(80);
    series2.columns.template.tooltipText =
      "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series2.name = 'Series 2';
    series2.dataFields.categoryY = 'category';
    series2.dataFields.valueX = 'value2';
    series2.dataFields.valueXShow = 'totalPercent';
    // series2.dataItems.template.locations.categoryX = 0.5;
    series2.stacked = true;
    // series2.tooltip.pointerOrientation = "vertical";

    let bullet2 = series2.bullets.push(new am4charts.LabelBullet());
    bullet2.interactionsEnabled = false;
    bullet2.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet2.locationX = 0.5;
    bullet2.label.fill = am4core.color('#ffffff');

    let series3 = chart.series.push(new am4charts.ColumnSeries());
    series3.columns.template.width = am4core.percent(80);
    series3.columns.template.tooltipText =
      "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series3.name = 'Series 3';
    series3.dataFields.categoryY = 'category';
    series3.dataFields.valueX = 'value3';
    series3.dataFields.valueXShow = 'totalPercent';
    // series3.dataItems.template.locations.categoryX = 0.5;
    series3.stacked = true;
    // series3.tooltip.pointerOrientation = "vertical";

    let bullet3 = series3.bullets.push(new am4charts.LabelBullet());
    bullet3.interactionsEnabled = false;
    bullet3.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet3.locationX = 0.5;
    bullet3.label.fill = am4core.color('#ffffff');

    chart.scrollbarX = new am4core.Scrollbar();
  }
}
