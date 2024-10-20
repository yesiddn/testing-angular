import { Person } from "./person.model";

fdescribe('Tests for Person Model', () => {
  let person: Person;

  beforeEach(() => {
    person = new Person('John', 'Doe', 30, 80, 1.80);
  });

  it('should attribute values to the properties', () => {
    expect(person.name).toBe('John');
    expect(person.lastName).toBe('Doe');
    expect(person.age).toBe(30);
    expect(person.weight).toBe(80);
    expect(person.height).toBe(1.80);
  });

  describe('Tests for calcIMC method', () => {
    it('should return a string: down', () => {
      // Arrange
      person.weight = 40;
      person.height = 1.70;

      // Act
      const result = person.calcIMC();

      // Assert
      expect(result).toBe('down');
    });

    it('should return a string: normal', () => {
      // Arrange
      person.weight = 51;
      person.height = 1.70;

      // Act
      const result = person.calcIMC();

      // Assert
      expect(result).toBe('normal');
    });

    it('should return a string: not found', () => {
      // Arrange
      person.weight = -1;
      person.height = 1.70;

      // Act
      const result = person.calcIMC();

      // Assert
      expect(result).toBe('not found');

      // AAA
      person.weight = 0;
      person.height = 0;
      const result2 = person.calcIMC();
      expect(result2).toBe('not found');
    });
  });
});
