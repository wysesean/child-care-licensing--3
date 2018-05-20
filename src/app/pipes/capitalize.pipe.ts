import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const lowerCaseString = value.toLowerCase();
    const capitalized = lowerCaseString.split(' ').map(string => {
      if (typeof string[0] === 'string') {
        return string.charAt(0).toUpperCase() + string.substr(1);
      }
      return string;
    }).join(' ');

    return capitalized;

  }

}
