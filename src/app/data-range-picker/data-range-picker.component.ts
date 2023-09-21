import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-data-range-picker',
  templateUrl: './data-range-picker.component.html',
  styleUrls: ['./data-range-picker.component.scss'],
})
export class DataRangePickerComponent implements OnInit {
  @Output() monthRangeSelected = new EventEmitter<string>();

  currentYearIndex: number = 0;
  years: Array<number> = [];
  months: Array<string> = [];
  monthsData: Array<{
    monthName: string;
    monthYear: number;
    isInRange: boolean;
    isLowerEdge: boolean;
    isUpperEdge: boolean;
  }> = [];
  rangeIndexes: Array<number> = [];
  monthViewSlicesIndexes: Array<number> = [];
  monthDataSlice: Array<{
    monthName: string;
    monthYear: number;
    isInRange: boolean;
    isLowerEdge: boolean;
    isUpperEdge: boolean;
  }> = [];
  globalIndexOffset: number = 0;

  onClick(indexClicked: any) {
    if (this.rangeIndexes[0] === null) {
      this.rangeIndexes[0] = this.globalIndexOffset + indexClicked;
    } else if (this.rangeIndexes[1] === null) {
      this.rangeIndexes[1] = this.globalIndexOffset + indexClicked;
      this.rangeIndexes.sort((a, b) => a - b);
      this.monthsData.forEach((month, index) => {
        if (this.rangeIndexes[0] <= index && index <= this.rangeIndexes[1]) {
          month.isInRange = true;
        }
        if (this.rangeIndexes[0] === index) {
          month.isLowerEdge = true;
        }
        if (this.rangeIndexes[1] === index) {
          month.isUpperEdge = true;
        }
      });
      let fromMonthYear = this.monthsData[this.rangeIndexes[0]];
      let toMonthYear = this.monthsData[this.rangeIndexes[1]];
      this.emitData(
        `Range is: ${fromMonthYear.monthName} ${fromMonthYear.monthYear} to ${toMonthYear.monthName} ${toMonthYear.monthYear}`
      );
    } else {
      this.initRangeIndexes();
      this.initMonthsData();
      this.onClick(indexClicked);
      this.sliceDataIntoView();
    }
  }

  emitData(string: string) {
    this.monthRangeSelected.emit(string);
  }

  sliceDataIntoView() {
    this.globalIndexOffset = this.monthViewSlicesIndexes[this.currentYearIndex];
    this.monthDataSlice = this.monthsData.slice(
      this.globalIndexOffset,
      this.globalIndexOffset + 24
    );
  }

  incrementYear() {
    if (this.currentYearIndex !== this.years.length - 1) {
      this.currentYearIndex++;
      this.sliceDataIntoView();
    }
  }

  decrementYear() {
    if (this.currentYearIndex !== 0) {
      this.currentYearIndex--;
      this.sliceDataIntoView();
    }
  }

  initRangeIndexes() {
    this.rangeIndexes = [];
  }

  initMonthsData() {
    this.monthsData = new Array();
    this.years.forEach((year) => {
      this.months.forEach((month) => {
        this.monthsData.push({
          monthName: month,
          monthYear: year,
          isInRange: false,
          isLowerEdge: false,
          isUpperEdge: false,
        });
      });
    });
  }

  initYearLabels() {
    const currentYear = new Date().getFullYear();
    const range = (start: number, stop: number, step: number) =>
      Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step
      );
    this.years = range(currentYear - 100, currentYear + 100, 1);
  }

  initMonthLabels() {
    this.months = new Array(12).fill(0).map((_, i) => {
      return new Date(`${i + 1}/1`).toLocaleDateString(undefined, {
        month: 'short',
      });
    });
  }

  initViewSlices() {
    this.monthViewSlicesIndexes = [];
    this.years.forEach((year, index) => {
      if (index === 0) {
        this.monthViewSlicesIndexes.push(0);
      } else if (index === 1) {
        this.monthViewSlicesIndexes.push(6);
      } else
        this.monthViewSlicesIndexes.push(
          this.monthViewSlicesIndexes[index - 1] + 12
        );
    });
  }

  ngOnInit() {
    this.initYearLabels();
    this.initMonthLabels();
    this.initViewSlices();
    this.initMonthsData();
    this.initRangeIndexes();
    this.currentYearIndex = this.years.findIndex(
      (year) => year === new Date().getFullYear()
    );
    this.sliceDataIntoView();
  }
}
