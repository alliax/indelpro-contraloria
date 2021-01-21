import { NgModule } from '@angular/core';
import { SapDatePipe } from './sap-date.pipe';
import { ObjToArrPipe } from './obj-to-arr.pipe';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [],
  exports: [SapDatePipe, ObjToArrPipe],
  declarations: [SapDatePipe, ObjToArrPipe],
  providers: [SapDatePipe, ObjToArrPipe, DatePipe],
})
export class UiPipesModule {}
