import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sapDate',
})
export class SapDatePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const fechaString =
      value.substring(0, 4) +
      '-' +
      value.substring(4, 6) +
      '-' +
      value.substring(6, 8);

    return new Date(fechaString);
  }
}
