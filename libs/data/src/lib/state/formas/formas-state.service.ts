import { Injectable } from '@angular/core';
import { SolicitudesService } from './solicitudes/solicitudes.service';
import { TiposService } from './tipos/tipos.service';
import { UsuariosService } from '../activo/usuarios/usuarios.service';
import { SapFormasService } from './sap/sap.service';
import { ConfiguracionService } from './configuracion/configuracion.service';
import { ConfiguracionQuery } from './configuracion/configuracion.query';

@Injectable({ providedIn: 'root' })
export class FormasStateService {
  constructor(
    private solicitudesService: SolicitudesService,
    private tiposService: TiposService,
    private usuariosService: UsuariosService,
    private sapFormasService: SapFormasService,
    private configuracionService: ConfiguracionService,
    private configuracionQuery: ConfiguracionQuery
  ) {}

  async loadState() {
    try {
      await Promise.all([
        this.tiposService.load(),
        this.usuariosService.load(),
        this.configuracionService.load(),
        this.sapFormasService.load(),
      ]);
      await this.solicitudesService.load();
    } catch (err) {
      console.log('loadState error', err);
    }
  }

  async cambiaSapSettings(sapId) {
    try {
      await this.solicitudesService.reset();
      await this.solicitudesService.load({
        sapId,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
