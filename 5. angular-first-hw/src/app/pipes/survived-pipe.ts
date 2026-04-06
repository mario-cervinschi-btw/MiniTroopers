import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'alive' })
export class SurvivedPipe implements PipeTransform {
  transform(value: number): string {
    return value ? 'survived' : 'deceased';
  }
}
