import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import { NumberToArray } from './number-to-array.pipe';

describe('NumberToArray Pipe', () => {
  beforeEachProviders(() => [NumberToArray]);

  it('should transform the input', inject([NumberToArray], (pipe: NumberToArray) => {
      expect(pipe.transform(true)).toBe(null);
  }));
});
