import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objToArr',
})
export class ObjToArrPipe implements PipeTransform {
  transform(value: any, ...args: any[]): Array<any> {
    if (Array.isArray(value)) return value;
    return [value];
  }
}
