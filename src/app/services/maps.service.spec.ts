import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';

describe('MapsService', () => {
  let mapService: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapsService]
    });
    mapService = TestBed.inject(MapsService);
  });

  it('should be created', () => {
    expect(mapService).toBeTruthy();
  });

  describe('tests for getCurrentPosition', () => {
    it('should save the center coordinates', () => {
      // Arrange
      // Para la API del navegador, en el cual a veces no se retorna nada o usa callbacks, se puede hacer tests de esta manera
      spyOn(navigator.geolocation, 'getCurrentPosition')
      // usando callFake podemos simular el comportamiento de la función y en este caso ejecutar el callback que recibe como parámetro
        .and.callFake((successFn) => {
          const mockGeolocation: GeolocationPosition = {
            coords: {
              accuracy: 0,
              altitude: 0,
              altitudeAccuracy: 0,
              heading: 0,
              latitude: 100,
              longitude: 2000,
              speed: 0,
              // toJSON: () => { }, // aunque se marque como error, no es necesario y el test pasa sin problemas
            },
            timestamp: 0,
            // toJSON: ():any => { },
          };
          successFn(mockGeolocation);
        });

      // Act
      mapService.getCurrentPosition();

      // Assert
      expect(mapService.center).toEqual({ lat: 100, lng: 2000 });
      expect(mapService.center.lat).toBe(100);
      expect(mapService.center.lng).toBe(2000);
    });
  });
});
