import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ExpedientesStore, ExpedientesState } from './expedientes.store';
import { Expediente } from './expediente.model';
import { Observable, merge } from 'rxjs';
import { map, withLatestFrom, switchMap, tap, startWith } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ExpedientesQuery extends QueryEntity<ExpedientesState> {
  limit$ = this.select((state) => state.ui.limit);
  page$ = this.select((state) => state.ui.page);
  ultimaActualizacion$ = this.select((state) => state.ui.ultimaActualizacion);
  activo$ = this.select((state) => state.ui.activo);

  total$: Observable<number> = this.selectCount();

  paginados$ = merge(this.limit$, this.page$, this.selectAll()).pipe(
    withLatestFrom(this.limit$, this.page$, this.selectAll()),
    map((value: [any, number, number, Expediente[]]) => {
      const limit = value[1];
      const page = value[2];
      const expedientes = value[3];
      return expedientes.slice((page - 1) * limit, page * limit);
    })
  );

  // paginados$ = merge(this.limit$, this.page$)
  //   .pipe(
  //     withLatestFrom(this.selectAll()),
  //     tap(value => console.log(value))
  //   )
  //   .subscribe();

  // // paginated$: Observable<Expediente[]> = merge([
  // paginated$ = merge([this.selectAll(), this.limit$, this.page$])
  //   .pipe(
  //     withLatestFrom(this.selectAll(), this.limit$, this.page$),
  //     map(
  //       (
  //         value: [
  //           Observable<number | Expediente[]>,
  //           Expediente[],
  //           number,
  //           number
  //         ]
  //       ) => {
  //         console.log(value);
  //         return [];
  //       }
  //     )
  //   )
  //   .subscribe();

  // this.selectAll({
  //   sortBy: 'PROJK'
  // }).pipe(
  //   withLatestFrom([
  //     this.select(state => state.ui.limit),
  //     this.select(state => state.ui.page)
  //   ]),
  //   map((expedientesLimitPage: [Expediente[], number, number]) => {
  //     return expedientesLimitPage[0];
  //   })
  //   // map((expedientes: Expediente[]) => {
  //   //   return expedientes;
  //   // })
  // );
  constructor(protected store: ExpedientesStore) {
    super(store);
  }
}
