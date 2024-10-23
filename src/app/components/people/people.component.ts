import { Component } from '@angular/core';
import { PersonComponent } from '../person/person.component';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [PersonComponent],
  templateUrl: './people.component.html',
  styleUrl: './people.component.css'
})
export class PeopleComponent {
  person: Person = new Person('Duvan', 'Yesid', 19, 51, 1.7);
  people: Person[] = [
    new Person('Carlos', 'Perez', 25, 70, 1.8),
    new Person('Valentina', 'Gonzalez', 27, 56, 1.6),
  ];
  selectedPerson: Person | undefined;

  choosePerson(person: Person) {
    this.selectedPerson = person;
  }
}
