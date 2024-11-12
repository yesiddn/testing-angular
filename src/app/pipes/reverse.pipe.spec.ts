import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform "roma" to "amor"', () => {
    const pipe = new ReversePipe();
    const response = pipe.transform('roma');

    expect(response).toBe('amor');
  });

  it('should transform "12345" to "54321"', () => {
    const pipe = new ReversePipe();
    const response = pipe.transform('12345');

    expect(response).toBe('54321');
  });
});
