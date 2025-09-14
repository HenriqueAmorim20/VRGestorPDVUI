import { Injectable } from '@angular/core';
import { DynamicResourceService } from '../../../shared/services/dynamic-resource/dynamic-resource.service';
import { PDV } from './interfaces/pdv.interface';

@Injectable({
  providedIn: 'root',
})
export class PDVService extends DynamicResourceService<PDV> {
  constructor() {
    super();
    this.initUrl('pdv');
  }
}
