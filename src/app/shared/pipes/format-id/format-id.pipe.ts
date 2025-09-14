import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatId',
})
export class FormatIdPipe implements PipeTransform {
  transform(value: string | number): string | number {
    if (!value) return value;

    try {
      return value.toString().padStart(4, '0');
    } catch {
      return value;
    }
  }
}
