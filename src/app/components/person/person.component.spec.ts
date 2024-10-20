import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';

fdescribe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>; // ambiente para poder interactuar con el componente

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // lifecycle hook
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a <p> with "Soy un parrafo"', () => {
    const personElement: HTMLElement = fixture.nativeElement; // elemento que se esta renderizando
    const p = personElement.querySelector('p');
    expect(p?.textContent).toBe('Soy un parrafo');
  });
});
