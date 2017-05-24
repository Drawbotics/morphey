import { expect } from 'chai';
import fromValue from '../src/from-value';


describe('from-value', function () {
  describe('fromValue(value)', function () {
    it('should return an object with `isFromValue` equal true', function () {
      const result = fromValue('test');
      expect(result.isFromValue).to.be.true;
    });
    it('should return an object with a `value` prop equal to the passed value', function () {
      const result = fromValue('test');
      expect(result.value).to.equal('test');
    });
  });
});
