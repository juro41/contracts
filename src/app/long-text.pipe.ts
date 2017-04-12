import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'longText'
})
export class LongTextPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    let outputTitle: string = value;
    if (value.length > 100) {
      outputTitle = value.substring(0, 100) + value.substring(100).split(" ")[0] + "...";
    }
    return outputTitle.charAt(0).toUpperCase() + outputTitle.slice(1);
  }

}
