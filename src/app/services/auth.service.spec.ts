import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { AuthService } from "./auth.service";
import { TokenService } from "./token.service";
import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { Auth } from "../models/auth.model";

describe('AuthService', () => {
  let authService: AuthService;
  let tokenService: TokenService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthService,
        TokenService
      ]
    });

    authService = TestBed.inject(AuthService);
    tokenService = TestBed.inject(TokenService);
    httpTestController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('tests for login', () => {
    it('should return a token', (doneFn) => {
      // Arrange
      const mockData: Auth = {
        access_token: '1234567890'
      };
      const email = 'nico@gmail.com';
      const password = '123';

      // Act
      authService.login(email, password).subscribe({
        next: (data) => {
          // Assert
          expect(data).toEqual(mockData);
          doneFn();
        },
        error: (error) => {
          // Assert
          fail(error);
        }
      });

      // http config
      const req = httpTestController.expectOne(`https://api.escuelajs.co/api/v1/auth/login`);
      req.flush(mockData);

      expect(req.request.method).toEqual('POST');
    });

    it('should call to saveToken', (doneFn) => {
      // Arrange
      const mockData: Auth = {
        access_token: '1234567890'
      };
      const email = 'nico@gmail.com';
      const password = '123';
      spyOn(tokenService, 'saveToken').and.callThrough(); // como esta funcion no retorna nada, no hace falta poner un and.returnValue -> con el callThrough se evita que se llame al metodo original y solo se espia

      // Act
      authService.login(email, password).subscribe({
        next: (data) => {
          // Assert
          expect(data).toEqual(mockData);
          expect(tokenService.saveToken).toHaveBeenCalled();
          expect(tokenService.saveToken).toHaveBeenCalledWith(mockData.access_token); // se puede verificar que el metodo tenga un argumento en particular
          doneFn();
        },
        error: (error) => {
          // Assert
          fail(error);
        }
      });

      // http config
      const req = httpTestController.expectOne(`https://api.escuelajs.co/api/v1/auth/login`);
      req.flush(mockData);

      expect(req.request.method).toEqual('POST');
    });
  });

});
