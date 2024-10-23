import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from '../../models/person.model';

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

  it('should the name be "Duvan"', () => {
    component.person = new Person('Duvan', 'Yesid', 19, 51, 1.7);
    expect(component.person.name).toBe('Duvan');
  });

  it('should have a <h3> with "Hola, {{ persone.name }}"', () => {
    // Arrange
    component.person = new Person('Valentina', 'Gonzalez', 25, 60, 1.65);
    const expectMsg = `Hola, ${component.person.name}`;

    const personDebug: DebugElement = fixture.debugElement; // con debugElement se puede ser agnostico a la plataforma en caso de que se haga SSR, por ejemplo
    const personElement: HTMLElement = personDebug.nativeElement; // ahora si se obtiene el elemento
    const h3 = personElement.querySelector('h3'); // se pueden hacer querys en caso de que la plataforma lo permita, nativeScript si lo permite

    // Act
    fixture.detectChanges(); // se debe llamar cada que cambiemos alguna propiedad del componente

    // Assert
    expect(h3?.textContent).toBe(expectMsg);
  });

  it('should have a <p> with "{{ person.age }}"', () => {
    // Arrange
    component.person = new Person('Duvan', 'Yesid', 19, 51, 1.7);

    const personElement: HTMLElement = fixture.nativeElement; // elemento que se esta renderizando
    const p = personElement.querySelector('p');

    // Act
    fixture.detectChanges();

    // Assert
    expect(p?.textContent).toContain(component.person.age); // de esta forma validamos que tenga la edad correcta y no el mensaje completo ya que este puede tener pequeñas variaciones que pueden llevar a error
  });

  it('should have a <span> with "By.css"', () => {
    const personDebug: DebugElement = fixture.debugElement;
    // ademas de query (trae el primer elemento que encuentre), existe queryAll, queryAllNodes, queryAllNodesLocal, queryAllNodesRemote
    const spanDebug: DebugElement = personDebug.query(By.css('span')); // se le puede pasar la plataforma que se este utilizando y es buena practica para hacer querys muy complejas y otras cosas
    const spanElement: HTMLElement = spanDebug.nativeElement;
    expect(spanElement?.textContent).toBe('By.css');
  });

  it('should display a text with IMC when call calcIMC', () => {
    // Arrange
    const expectedIMC = 'normal';
    component.person = new Person('Duvan', 'Yesid', 19, 51, 1.7);
    const button: HTMLElement = fixture.debugElement.query(By.css('button.btn-imc')).nativeElement;

    // Act
    component.calcIMC();
    fixture.detectChanges();

    // Assert
    expect(component.imc).toContain(expectedIMC);
  });

  it('should display a text with IMC when do click in the button', () => {
    // Arrange
    const expectedIMC = 'normal';
    component.person = new Person('Duvan', 'Yesid', 19, 51, 1.7);
    const buttonDebug = fixture.debugElement.query(By.css('button.btn-imc'));
    const buttonElement = buttonDebug.nativeElement;

    // Act -> Click: https://angular.dev/guide/testing/components-scenarios#clicking
    // al debugElement se le puede llamar el metodo triggerEventHandler para simular un evento
    // buttonDebug.triggerEventHandler('click', null); // se puede pasar un evento, pero en este caso no es necesario

    // al nativeElement se le puede llamar el metodo click para simular un evento
    buttonElement.click();
    fixture.detectChanges();

    // Assert
    expect(component.imc).toContain(expectedIMC);
  });

  it('should raise selected event when clicked', () => {
    // Arrange
    let selectedPerson: Person = new Person('Carlos', 'Perez', 25, 70, 1.75);
    component.person = selectedPerson;
    const buttonDe = fixture.debugElement.query(By.css('button.btn-choose'));

    let selectedPersonResult: Person | undefined;
    component.onSelected.subscribe({
      next: (person: Person) => selectedPersonResult = person,
      error: () => {},
    })

    // Act
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Assert
    expect(selectedPersonResult).toBe(selectedPerson);
  });
});

// los host components son componentes que se utilizan para hacer tests aislando un componente en especifico y no tener que hacer tests en un componente que puede tener muchos otros componentes hijos -> generalmente se usa en componentes con inputs y outputs que dependen de otros componentes
@Component({
  standalone: true,
  imports: [PersonComponent],
  template: `
    <app-person [person]="person" (onSelected)="onSelected($event)"></app-person>
  `
})
class HostComponent {
  person: Person = new Person('Duvan', 'Yesid', 19, 51, 1.7);
  selectedPerson: Person | undefined;

  onSelected(person: Person) {
    this.selectedPerson = person;
  }
}

describe('PersonComponent from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>; // ambiente para poder interactuar con el componente

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent, PersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // lifecycle hook
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display person name', () => {
    // Arrange
    const expectedName = component.person.name;
    const h3Debug: DebugElement = fixture.debugElement.query(By.css('app-person h3'));
    const h3Element: HTMLElement = h3Debug.nativeElement;

    // Act
    fixture.detectChanges();

    // Assert
    expect(h3Element.textContent).toContain(expectedName);
  });

  it('should raise selected event when clicked', () => {
    // Arrange
    const buttonDe = fixture.debugElement.query(By.css('app-person button.btn-choose'));

    // Act
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Assert
    expect(component.selectedPerson).toEqual(component.person);
  });
});
