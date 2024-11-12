import { Component } from '@angular/core';
import { HighlightDirective } from './highlight.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [HighlightDirective, FormsModule],
  template: `
    <h5 class="title" highlight>default color</h5>
    <h5 highlight="yellow">yellow</h5>
    <p highlight="blue">default paragraph color</p>
    <p>default paragraph without highlight</p>
    <input type="text" [(ngModel)]="color" [highlight]="color" />
  `,
})
class HostComponent {
  color = 'gray';
}

fdescribe('HighlightDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent, HighlightDirective, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have three highlighted elements', () => {
    //const elements = fixture.debugElement.queryAll(By.css('*[highlight]')); // * means any element
    const elements = fixture.debugElement.queryAll(By.directive(HighlightDirective)); // this is better
    const withoutHighlight = fixture.debugElement.queryAll(By.css('*:not([highlight])'));

    expect(elements.length).toBe(4);
    expect(withoutHighlight.length).toBe(2);
  });

  it('should the elements be match with bgColor', () => {
    const elements = fixture.debugElement.queryAll(By.directive(HighlightDirective));
    expect(elements[0].nativeElement.style.backgroundColor).toBe('gray');
    expect(elements[1].nativeElement.style.backgroundColor).toBe('yellow');
    expect(elements[2].nativeElement.style.backgroundColor).toBe('blue');

    expect(elements.length).toBe(4);
  });

  it('should the h5.title be defaultColor', () => {
    const titleDe = fixture.debugElement.query(By.css('.title'));
    const directive = titleDe.injector.get(HighlightDirective); // get the directive instance

    expect(titleDe.nativeElement.style.backgroundColor).toBe(directive.defaultColor); // gray
  });

  it('should bind <input/> and change the bgColor', () => {
    const inputDe = fixture.debugElement.query(By.css('input'));
    const inputEl: HTMLInputElement = inputDe.nativeElement;

    expect(inputEl.style.backgroundColor).toBe('gray');

    inputEl.value = 'red';
    inputEl.dispatchEvent(new Event('input')); // trigger input event -> lanza un evento de input
    fixture.detectChanges();

    expect(inputEl.style.backgroundColor).toBe('red');
    expect(component.color).toBe('red');
  });
});
