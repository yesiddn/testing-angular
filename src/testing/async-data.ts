import { defer, of } from "rxjs";

async function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

async function asyncError(errorObject: unknown) {
  return defer(() => Promise.reject(errorObject));
}

async function mockObservable<T>(data: T) {
  return of(data);
}

async function mockPromise<T>(data: T) {
  return Promise.resolve(data);
}
