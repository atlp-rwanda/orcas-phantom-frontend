import sampleFunction from '../index';
import {test, expect} from '@jest/globals';


test('adds 1 + 2 to equal 3', () => {
  
  expect(sampleFunction(1, 2)).toBe(3);
});
