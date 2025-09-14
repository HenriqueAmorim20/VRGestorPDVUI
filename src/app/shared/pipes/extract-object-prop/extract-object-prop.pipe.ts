import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractObjectProp',
})
export class ExtractObjectPropPipe implements PipeTransform {
  transform<T>(value: T, key: keyof T): unknown {
    try {
      return value[key] ?? ' - ';
    } catch {
      return ' - ';
    }
  }
}
