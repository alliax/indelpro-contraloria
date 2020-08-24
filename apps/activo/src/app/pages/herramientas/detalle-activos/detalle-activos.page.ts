import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Activo, GrupoActivo } from '@indelpro-contraloria/data';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, combineLatest, from, Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'indelpro-contraloria-detalle-activos',
  templateUrl: './detalle-activos.page.html',
  styleUrls: ['./detalle-activos.page.scss'],
})
export class DetalleActivosPage implements OnInit {
  @Input() grupo: GrupoActivo;
  searchEvent: BehaviorSubject<string> = new BehaviorSubject<string>('');
  grupoActual: BehaviorSubject<GrupoActivo> = new BehaviorSubject<GrupoActivo>(
    null
  );

  filtrados$: Observable<Activo[]> = combineLatest([
    this.grupoActual,
    this.searchEvent,
  ]).pipe(
    map((val: [GrupoActivo, string]) =>
      val[0].registros.filter(
        (registro) =>
          registro.ANLN1.toUpperCase().includes(val[1]) ||
          registro.TXT50.toUpperCase().includes(val[1])
      )
    )
  );

  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {
    this.grupoActual.next(this.grupo);
  }

  buscar(event) {
    this.searchEvent.next(event.target.value.toString().toUpperCase());
  }
}
