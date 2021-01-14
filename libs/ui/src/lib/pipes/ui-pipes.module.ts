import { NgModule } from '@angular/core';
import { SapDatePipe } from './sap-date.pipe';
import { ObjToArrPipe } from './obj-to-arr.pipe';

@NgModule({
  imports: [],
  exports: [SapDatePipe, ObjToArrPipe],
  declarations: [SapDatePipe, ObjToArrPipe],
  providers: [SapDatePipe, ObjToArrPipe],
})
export class UiPipesModule {}
