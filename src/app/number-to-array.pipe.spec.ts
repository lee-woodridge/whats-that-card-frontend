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

  it('should transform the input', inject([NumberToArrayPipe], (pipe: NumberToArrayPipe) => {
      expect(pipe.transform(1)).toBe([1]);
  }));
});
