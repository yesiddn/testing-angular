import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PersonComponent', () => {
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

  it('should have a <h3> with "Hola, PersonComponent"', () => {
    const personDebug: DebugElement = fixture.debugElement; // con debugElement se puede ser agnostico a la plataforma en caso de que se haga SSR, por ejemplo
    const personElement: HTMLElement = personDebug.nativeElement; // ahora si se obtiene el elemento
    const h3 = personElement.querySelector('h3'); // se pueden hacer querys en caso de que la plataforma lo permita, nativeScript si lo permite
    expect(h3?.textContent).toBe('Hola, PersonComponent');
  });

  it('should have a <span> with "By.css"', () => {
    const personDebug: DebugElement = fixture.debugElement;
    // ademas de query (trae el primer elemento que encuentre), existe queryAll, queryAllNodes, queryAllNodesLocal, queryAllNodesRemote
    const spanDebug: DebugElement = personDebug.query(By.css('span')); // se le puede pasar la plataforma que se este utilizando y es buena practica para hacer querys muy complejas y otras cosas
    const spanElement: HTMLElement = spanDebug.nativeElement;
    expect(spanElement?.textContent).toBe('By.css');
  });
});
