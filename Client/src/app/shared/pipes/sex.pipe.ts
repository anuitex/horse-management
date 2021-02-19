import { Sex } from 'src/app/core/enums';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sex'
})
export class SexPipe implements PipeTransform {

  transform(value: Sex): string {
    if (Sex.Female === value) {
      return Sex[Sex.Female]
    }
    return Sex[Sex.Male]
  }

}
