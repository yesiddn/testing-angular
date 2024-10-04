# TestingAngularServices

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

##

## Karma launcher Chrome not installed

Si Chrome no esta instalado, se puede usar otro navegador para correr las pruebas unitarias. Para esto se debe modificar el archivo `karma.conf.js` y cambiar el valor de `browsers` por el navegador deseado. Por ejemplo, para usar Edge se debe cambiar el valor de `browsers` a `['Edge']`.

```javascript
// karma.conf.js
module.exports = function(config) {
  config.set({
    browsers: ['Edge']
  });
};
```

También es necesario instalar el launcher de Edge con el siguiente comando:

```bash
npm install karma-edge-launcher --save-dev
```

### Instalar Chrome en WSL

En el [este blog](https://scottspence.com/posts/use-chrome-in-ubuntu-wsl) se explica como instalar Chrome en WSL.

## Code Coverage

Para generar un reporte de cobertura de código se debe ejecutar el siguiente comando:

```bash
ng test --no-watch --code-coverage
```

Este comando generará un reporte en la carpeta `coverage/` que se puede visualizar abriendo el archivo `index.html` en un navegador.

### Focus group of tests

Cuando se quiere correr solo un grupo de tests en particular se puede usar la función `fdescribe` para enfocar un test en particular.

```typescript
fdescribe('Test for Calculator', () => {});
```

### Focus a single test

Para enfocar un solo test se puede usar la función `fit`.

```typescript
fit('#multiply should return nine', () => {});
```

### Skip a group of tests

Para saltar un grupo de tests se puede usar la función `xdescribe`.

```typescript
xdescribe('Test for Calculator', () => {});
```

### Skip a single test

Para saltar un solo test se puede usar la función `xit`.

```typescript
xit('#multiply should return nine', () => {});
```

### Cambiar porcentaje mínimo de cobertura

Para cambiar el porcentaje mínimo de cobertura se debe modificar el archivo `karma.conf.js` y agregar a la propiedad `coverageReporter` el `check` con el porcentaje deseado.

```javascript
// karma.conf.js
module.exports = function (config) {
  config.set({
    coverageReporter: {
      check: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80
        }
      }
    }
  });
};
```

De esta forma, si el porcentaje de cobertura es menor al 80% el comando `ng test` nos mostrará un error.

## Mocha reporter

Mocha nos ayuda a visualizar los resultados de las pruebas unitarias de una forma más amigable. Para usar Mocha se debe instalar el paquete `karma-mocha-reporter` con el siguiente comando:

```bash
npm install karma-mocha-reporter --save-dev
```

Luego se debe modificar el archivo `karma.conf.js` y agregar el reporter de Mocha.

```javascript
// karma.conf.js
module.exports = function(config) {
  config.set({
    plugins: [
      require('karma-mocha-reporter')
    ],
    reporters: ['mocha']
  });
};
```

Y ya se puede correr las pruebas unitarias con el comando `ng test` y ver los resultados en la consola.
