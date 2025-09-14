import { Injectable } from '@angular/core';
import { Rede } from './interfaces/rede.interface';
import { DynamicResourceService } from '../../../shared/services/dynamic-resource/dynamic-resource.service';

@Injectable({
  providedIn: 'root',
})
export class RedeService extends DynamicResourceService<Rede> {
  constructor() {
    super();
    this.initUrl('rede');
  }
}
