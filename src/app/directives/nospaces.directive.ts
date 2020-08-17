import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNospaces]'
})
export class NospacesDirective {

  constructor() { }

  @HostListener('keydown', ['$event'])
  checkWords(event: any) {
    if(event && event.target && event.which == 32) {
      const  val = event.target.value;
      if(!val || val == '' || val.toString().charAt(val.length - 1) == '') {
        event.preventDefault();
      }
    }
  }
}
