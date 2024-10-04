import { Calculator } from "./calculator";

// Test unitarios con Jasmine -> https://codingpotions.com/angular-testing
describe('Test for Calculator', () => {
  describe('Test for multiply', () => {
    // el # es para indicar que es un método de la clase
    it('#multiply should return nine', () => {
      // AAA
      // Arrange
      const calculator = new Calculator();
      // Act
      const result = calculator.multiply(3, 3);
      // Assert
      expect(result).toBe(9);
    });

    it('#multiply should return four', () => {
      // AAA
      // Arrange
      const calculator = new Calculator();
      // Act
      const result = calculator.multiply(2, 2);
      // Assert
      expect(result).toEqual(4);
    });
  });

  describe('Test for divide', () => {
    it('#divide should return some numbers', () => {
      // AAA
      // Arrange
      const calculator = new Calculator();
      // Act
      const resultOne = calculator.divide(2, 2);
      const resultTwo = calculator.divide(4, 2);
      const resultThree = calculator.divide(5, 2);
      const resultFour = calculator.divide(6, 0);
      // Assert
      expect(resultOne).toEqual(1);
      expect(resultTwo).toEqual(2);
      expect(resultThree).toEqual(2.5);
      expect(resultFour).toBeNull();
    });
  });

  // jasmine matchers -> https://jasmine.github.io/api/2.7/matchers.html
  // jest matchers -> https://jestjs.io/docs/using-matchers
  it('test matchers', () => {
    const name = 'Yesid';
    let name2;

    expect(name).toBeDefined();
    expect(name2).toBeUndefined();

    // expect(1 + 3 === 3).toBeTruthy();
    expect(1 + 1 === 3).toBeFalsy();

    expect(5).toBeGreaterThan(4);
    expect(5).toBeGreaterThanOrEqual(5);
    expect(5).toBeLessThan(6);
    expect(5).toBeLessThanOrEqual(5);

    expect('123456').toMatch(/123/); // expresiones regulares
    expect(['apples', 'oranges', 'pears']).toContain('oranges');
  });
})
