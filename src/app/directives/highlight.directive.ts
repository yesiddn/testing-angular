import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true
})
export class HighlightDirective {
  defaultColor = 'gray';
  @Input('highlight') highlightColor: string = '';

  constructor(private element: ElementRef) {
    this.element.nativeElement.style.backgroundColor = this.defaultColor;
  }

  ngOnChanges() {
    this.element.nativeElement.style.backgroundColor = this.highlightColor || this.defaultColor;
  }
}
