import { Injectable } from '@angular/core';
import { AjustesStore, AjustesState } from './ajustes.store';

@Injectable({ providedIn: 'root' })
export class AjustesService {
  constructor(protected store: AjustesStore) {}
}
