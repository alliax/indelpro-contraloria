import { Injectable } from '@angular/core';
import { SolicitudesService } from './solicitudes/solicitudes.service';
import { TiposService } from './tipos/tipos.service';

@Injectable({ providedIn: 'root' })
export class FormasStateService {
  constructor(
    private solicitudesService: SolicitudesService,
    private tiposService: TiposService
  ) {}

  loadState() {
    this.solicitudesService.load();
    this.tiposService.load();
  }
}
