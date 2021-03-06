import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'descriptonPipe' })
export class DescriptionPipe implements PipeTransform {
  transform(value: string, args?: any) {
    if (!value) return null;

    return value.substr(0, 150) + '...';
  }
}
