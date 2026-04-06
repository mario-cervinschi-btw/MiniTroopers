import { Pipe, PipeTransform } from '@angular/core';

/**
 * Takes name of type John, Mr. Smith and convers it to Mr. Smith John
 */
@Pipe({ name: 'fullname' })
export class FullNameGeneratePipe implements PipeTransform {
  transform(value: string): string {
    const splittedName = value.trim().split(',');

    return splittedName[1] + ' ' + splittedName[0];
  }
}
