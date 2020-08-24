import { Injectable } from '@angular/core';
import { ExpedientesService } from './activo/expendientes/expedientes.service';
import { UsuariosService } from './activo/usuarios/usuarios.service';
import { TipoActivosService } from './activo/tipo-activos/tipo-activos.service';
import { ActivosService } from './activo/activos/activos.service';
import { SapService } from './activo/sap/sap.service';
import { GrupoUbicacionesService } from './activo/grupo-ubicaciones/grupo-ubicaciones.service';
import { UbicacionesService } from './activo/ubicaciones/ubicaciones.service';
import { SapQuery } from './activo/sap/sap.query';

@Injectable({ providedIn: 'root' })
export class StateService {
  constructor(
    private expedientesService: ExpedientesService,
    private activosService: ActivosService,
    private usuariosService: UsuariosService,
    private tipoActivos: TipoActivosService,
    private sapService: SapService,
    private grupoUbicacionesService: GrupoUbicacionesService,
    private ubicacionesService: UbicacionesService,

    private sapQuery: SapQuery
  ) {}

  async loadState() {
    await this.usuariosService.load();
    await this.tipoActivos.load();
    await this.sapService.load();
    await this.grupoUbicacionesService.load();
    await this.ubicacionesService.load();

    const sapActivo = this.sapQuery.getAll().find((sap) => sap.activo === true);
    if (sapActivo) {
      this.cambiaSapSettings(sapActivo._id);
    }
  }

  async cambiaSapSettings(sapId) {
    await this.expedientesService.load({ sapId });
    await this.activosService.load({ sapId });
  }
}
