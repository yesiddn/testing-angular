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
