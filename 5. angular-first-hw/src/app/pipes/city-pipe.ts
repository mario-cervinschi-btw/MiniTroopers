import { Pipe, PipeTransform } from '@angular/core';

const CONVERTING_VALUES: { [index: string]: string } = {
  S: 'Southampton',
  C: 'Cherbourg',
  Q: 'Queenstown',
};

@Pipe({ name: 'fullcity' })
export class CityCompletionPipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) {
      return 'INVALID';
    }
    return CONVERTING_VALUES[value];
  }
}
