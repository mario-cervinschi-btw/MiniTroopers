import { AbstractControl } from '@angular/forms';

const REGEX_PATTERN =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

export function websiteValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (!control.value) {
    return null;
  }

  const isValid = REGEX_PATTERN.test(control.value);

  return isValid ? null : { website: true };
}
