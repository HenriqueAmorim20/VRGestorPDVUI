import { Injectable } from '@angular/core';
import { DynamicResourceService } from '../../../shared/services/dynamic-resource/dynamic-resource.service';
import { Atualizacao } from './interfaces/atualizacao.interface';

@Injectable({
  providedIn: 'root',
})
export class AtualizacaoService extends DynamicResourceService<Atualizacao> {
  constructor() {
    super();
    this.initUrl('atualizacao');
  }
}
