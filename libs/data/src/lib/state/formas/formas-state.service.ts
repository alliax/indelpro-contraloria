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
    await Promise.all([
      this.tiposService.load(),
      this.usuariosService.load(),
      this.configuracionService.load(),
      this.sapFormasService.load(),
    ]);
    await this.solicitudesService.load();
    /*try {
      const confActiva = this.configuracionQuery
        .getAll()
        .find((conf) => conf.activo === true);
      if (confActiva) {
        await this.cambiaSapSettings(confActiva._id);
      }
    } catch (err) {}*/
  }

  async cambiaSapSettings(sapId) {
    await this.solicitudesService.reset();
    await this.solicitudesService.load({
      sapId,
    });
  }
}
