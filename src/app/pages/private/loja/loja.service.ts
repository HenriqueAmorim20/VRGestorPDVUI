import { Injectable } from '@angular/core';
import { Loja } from './interfaces/loja.interface';
import { DynamicResourceService } from '../../../shared/services/dynamic-resource/dynamic-resource.service';

@Injectable({
  providedIn: 'root',
})
export class LojaService extends DynamicResourceService<Loja> {
  constructor() {
    super();
    this.initUrl('loja');
  }
}
