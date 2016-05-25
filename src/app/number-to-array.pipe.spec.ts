import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import { NumberToArrayPipe } from './number-to-array.pipe';

describe('NumberToArrayPipe Pipe', () => {
  beforeEachProviders(() => [NumberToArrayPipe]);

  it('should transform the input', inject([NumberToArrayPipe], (pipe: NumberToArray) => {
      expect(pipe.transform(true)).toBe(null);
  }));
});
