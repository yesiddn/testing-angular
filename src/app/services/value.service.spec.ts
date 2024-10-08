// import { TestBed } from '@angular/core/testing';

import { TestBed } from '@angular/core/testing';
import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService] // se puede incluir servicios, componentes, pipes, etc. en el array de providers
    }); // de esta forma se configura el modulo de testing para el servicio ValueService y de esta forma se puede usar el patron singleton de angular para instanciar el servicio

    // service = new ValueService(); // instanciar el servicio antes de cada test
    service = TestBed.inject(ValueService); // ya no es necesario instanciar el servicio, se inyecta el servicio desde el modulo de testing
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // comprobar que el servicio se ha creado
  });

  describe('tests for get value', () => {
    it('should return "real value"', () => {
      expect(service.value).toBe('real value');
    });
  });

  describe('tests for set value', () => {
    it('should set value to "updated value"', () => {
      expect(service.value).toBe('real value');

      service.value = 'updated value';
      expect(service.value).toBe('updated value');
    });
  });

  describe('tests for getPromiseValue', () => {
    // cuando se tiene una funcion asincrona en la que hay que esperar a que se resuelva una promesa se debe usar el argumento done o la funcion doneFn para indicar donde termina el test
    it('should return "promise value" with then', (done: DoneFn) => {
      service.getPromiseValue()
        .then(value => {
          expect(value).toBe('promise value');
          done();
        });
    });

    // tambien se puede usar async y await para esperar a que se resuelva la promesa
    it('should return "promise value" with async', async () => {
      const value = await service.getPromiseValue();
      expect(value).toBe('promise value');
    });
  });
});
