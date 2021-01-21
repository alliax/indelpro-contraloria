import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'sapDate',
})
export class SapDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}
  transform(value: any, ...args: any[]): any {
    const fechaString =
      value.substring(0, 4) +
      '-' +
      value.substring(4, 6) +
      '-' +
      value.substring(6, 8);

    return this.datePipe.transform(new Date(fechaString), ...args);
  }
}
