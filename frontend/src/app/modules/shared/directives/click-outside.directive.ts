import { Directive, Output, EventEmitter, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  @Input() srcElement: any;
  @Output() appClickOutside: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event.target']) onMouseEnter(targetElement) {
    const clickedInside = this.srcElement.contains(targetElement) ||
      this.elementRef.nativeElement.contains(targetElement);

    if (!clickedInside) {
      this.appClickOutside.emit(true);
    }
  }


}
