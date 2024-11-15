import { Component } from '@angular/core';
import { ReversePipe } from './reverse.pipe';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform "roma" to "amor"', () => {
    const pipe = new ReversePipe();
    const response = pipe.transform('roma');

    expect(response).toBe('amor');
  });

  it('should transform "12345" to "54321"', () => {
    const pipe = new ReversePipe();
    const response = pipe.transform('12345');

    expect(response).toBe('54321');
  });
});

@Component({
  standalone: true,
  imports: [ReversePipe, FormsModule],
  template: `
    <h5>{{ 'text' | reverse }}</h5>
    <input [(ngModel)]="text" />
    <p>{{ text | reverse }}</p>
  `
})
class HostComponent {
  text = '';
}

describe('ReversePipe from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent, ReversePipe, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the h5 be "txet"', () => {
    const h5De = fixture.debugElement.query(By.css('h5'));
    expect(h5De.nativeElement.textContent).toBe('txet');
  });

  it('should apply the reverse pipe when typing in the input', () => {
    const inputDe = fixture.debugElement.query(By.css('input'));
    const inputElement: HTMLInputElement = inputDe.nativeElement;
    const pDe = fixture.debugElement.query(By.css('p'));

    expect(pDe.nativeElement.textContent).toBe('');

    inputElement.value = 'hello';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(pDe.nativeElement.textContent).toBe('olleh');
  });
});
