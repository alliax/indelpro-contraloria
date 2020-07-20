import { Injectable } from '@angular/core';
import { ExpedientesService } from './activo/expendientes/expedientes.service';
import { UsuariosService } from './activo/usuarios/usuarios.service';
import { TipoActivosService } from './activo/tipo-activos/tipo-activos.service';
import { ActivosService } from './activo/activos/activos.service';

@Injectable({ providedIn: 'root' })
export class StateService {
  constructor(
    private expedientesService: ExpedientesService,
    private activosService: ActivosService,
    private usuariosService: UsuariosService,
    private tipoActivos: TipoActivosService
  ) {}

  async loadState() {
    await this.expedientesService.load();
    await this.activosService.load();
    await this.usuariosService.load();
    await this.tipoActivos.load();
  }
}
