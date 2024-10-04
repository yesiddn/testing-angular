import { Calculator } from "./calculator";

// Test unitarios con Jasmine -> https://codingpotions.com/angular-testing
describe('Test for Calculator', () => {
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
})
