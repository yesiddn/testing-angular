// se crea un cascaron de un servicio falso para poder probar el servicio MasterService -> es la forma menos eficiente de hacer pruebas ya que si se hacen cambios en el servicio real se deben hacer los mismos cambios en el servicio falso
export class FakeValueService {
  constructor() { }

  get value() {
    return 'fake value';
  }

  set value(value: string) {
    // do nothing
  }

  getPromiseValue() {
    return Promise.resolve('fake promise value');
  }
}
