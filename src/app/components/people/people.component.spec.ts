import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { PersonComponent } from '../person/person.component';
import { Person } from '../../models/person.model';
import { By } from '@angular/platform-browser';

fdescribe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleComponent, PersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list app-person components', () => {
    component.people = [
      new Person('Carlos', 'Perez', 25, 70, 1.8),
      new Person('Valentina', 'Gonzalez', 27, 56, 1.6),
      new Person('Duvan', 'Yesid', 19, 51, 1.7)
    ];

    fixture.detectChanges(); // hay que llamar a detectChanges para que se rendericen los cambios y se pueda buscar los elementos actualizados

    // const debugElement = fixture.debugElement.queryAll(By.directive(PersonComponent)); // Find all app-person components
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));

    expect(debugElement.length).toBe(3);
  });

  it('should raise selected event when clicked', () => {
    const buttonDebug = fixture.debugElement.query(By.css('app-person .btn-choose'));

    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.selectedPerson).toBe(component.people[0]);
  });

  it('should render the selectedPeron', () => {
    const buttonDebug = fixture.debugElement.query(By.css('app-person .btn-choose'));

    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();

    const liDebug = fixture.debugElement.query(By.css('.selectedPerson ul > li'));

    expect(component.selectedPerson).toBe(component.people[0]);
    expect(liDebug.nativeElement.textContent).toContain(component.selectedPerson?.name);
  });
});
