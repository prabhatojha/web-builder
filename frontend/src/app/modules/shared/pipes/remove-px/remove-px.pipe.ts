import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removePx'
})
export class RemovePxPipe implements PipeTransform {

  transform(value: string): unknown {
    return value && value.includes('px') ? value.split('px')[0] : value;
  }

}
