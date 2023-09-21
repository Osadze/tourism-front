import { Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss'],
})
export class DetailedComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.createChart4();
    this.createChart2();
  }

  createChart4() {
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create('chart', am4charts.XYChart);
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = 'value1';
    series.dataFields.dateX = 'date';
    series.strokeWidth = 2;
    series.minBulletDistance = 10;
    series.tooltipText =
      '[bold]{date.formatDate()}:[/] {value1}\n[bold]{previousDate.formatDate()}:[/] {value2}';
    // series.tooltip.pointerOrientation = "vertical";

    // Create series
    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = 'value2';
    series2.dataFields.dateX = 'date';
    series2.strokeWidth = 2;
    series2.strokeDasharray = '3,4';
    series2.stroke = series.stroke;

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.data = [
      {
        date: new Date(2019, 5, 12),
        value1: 50,
        value2: 48,
        previousDate: new Date(2019, 5, 5),
      },
      {
        date: new Date(2019, 5, 13),
        value1: 53,
        value2: 51,
        previousDate: new Date(2019, 5, 6),
      },
      {
        date: new Date(2019, 5, 14),
        value1: 56,
        value2: 58,
        previousDate: new Date(2019, 5, 7),
      },
      {
        date: new Date(2019, 5, 15),
        value1: 52,
        value2: 53,
        previousDate: new Date(2019, 5, 8),
      },
      {
        date: new Date(2019, 5, 16),
        value1: 48,
        value2: 44,
        previousDate: new Date(2019, 5, 9),
      },
      {
        date: new Date(2019, 5, 17),
        value1: 47,
        value2: 42,
        previousDate: new Date(2019, 5, 10),
      },
      {
        date: new Date(2019, 5, 18),
        value1: 59,
        value2: 55,
        previousDate: new Date(2019, 5, 11),
      },
    ];
  }

  createChart2() {
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create('chart2', am4charts.SankeyDiagram);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      { from: 'A', to: 'D', value: 10 },
      { from: 'B', to: 'D', value: 8 },
      { from: 'B', to: 'E', value: 4 },
      { from: 'C', to: 'E', value: 3 },
      { from: 'D', to: 'G', value: 5 },
      { from: 'D', to: 'I', value: 2 },
      { from: 'D', to: 'H', value: 3 },
      { from: 'E', to: 'H', value: 6 },
      { from: 'G', to: 'J', value: 5 },
      { from: 'I', to: 'J', value: 1 },
      { from: 'H', to: 'J', value: 9 },
    ];

    let hoverState = chart.links.template.states.create('hover');
    hoverState.properties.fillOpacity = 0.6;

    chart.dataFields.fromName = 'from';
    chart.dataFields.toName = 'to';
    chart.dataFields.value = 'value';

    chart.paddingRight = 30;

    let nodeTemplate = chart.nodes.template;
    nodeTemplate.inert = true;
    nodeTemplate.readerTitle = 'Drag me!';
    nodeTemplate.showSystemTooltip = true;
    nodeTemplate.width = 20;

    let nodeTemplate2 = chart.nodes.template;
    nodeTemplate2.readerTitle = 'Click to show/hide or drag to rearrange';
    nodeTemplate2.showSystemTooltip = true;
    nodeTemplate2.cursorOverStyle = am4core.MouseCursorStyle.pointer;
  }
}
