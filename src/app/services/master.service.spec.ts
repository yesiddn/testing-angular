// import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { FakeValueService } from './value-fake.service';
import { ValueService } from './value.service';

describe('MasterService', () => {

  beforeEach(() => {
  });

  it('should return "real value" from the real service', () => {
    const valueService = new ValueService();

    let service: MasterService;
    service = new MasterService(valueService); // para hacer la inyeccion de dependencias hay que crear la instancia del servicio ValueService

    // la responsabilidad de getvalue es ejecutar el metodo value del servicio ValueService, no es repondable de lo que retorne el metodo value
    expect(service.getValue()).toBe('real value');
  });

  it('should return "fake value" from a fake service', () => {
    // 1. crear un clone de ValueService
    const fakeValueService = new FakeValueService();
    // 2. instanciar MasterService con el clone de ValueService
    const service = new MasterService(fakeValueService as unknown as ValueService); // como MasterService espera un ValueService y no un FakeValueService se debe hacer un cast a ValueService
    expect(service.getValue()).toBe('fake value');
  });

  it('sould return "fake from obj" from the fake object', () => {
    const fake = { value: 'fake from obj' }; // como en ValueService se usa un get value, no es necesario crear una funcion getValue en el objeto fake
    const masterService = new MasterService(fake as unknown as ValueService);
    expect(masterService.getValue()).toBe('fake from obj');
  });

  it('should call to getValue from ValueService', () => {
    // con jasmine.createSpyObj se crea un spy de un objeto -> se le envia el nombre del objeto como string y un array con los metodos que se quieren espiar
    const valueServiceSpy = jasmine.createSpyObj('ValueService', [], { value: 'fake value' }); // createSpyObj recibe 3 parametros: el nombre del objeto, un array con los metodos que se quieren espiar y un array con las propiedades que se quieren espiar o en su lugar un objeto con los valores que se quieren retornar en las propiedades espiadas
    // valueServiceSpy.method.and.returnValue('fake value'); // se configura el metodo un metodo para que retorne 'fake value'

    const masterService = new MasterService(valueServiceSpy);
    expect(masterService.getValue()).toBe('fake value');
    // expect(valueServiceSpy.method).toHaveBeenCalled(); // se verifica que un metodo del ValueService fue llamado
    // expect(valueServiceSpy.method).toHaveBeenCalledTimes(1); // se verifica cuantas veces fue llamado metodo  del ValueService
  });
});
