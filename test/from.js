import { expect } from 'chai';
import fromKey from '../src/from';


describe('from', function () {
  describe('fromKey(fromKey)', function () {
    it('should return an object with `fromKey` as a prop', function () {
      const result = fromKey('test');
      expect(result.fromKey).to.equal('test');
    });
    it('should return an object with `transform` as a prop', function () {
      const result = fromKey('test');
      expect(result.transform).to.exist;
    });
    it('should allow concatenation of transformations', function () {
      expect(() => fromKey('test').defaultTo('test').toString()).to.not.throw(Error);
    });
    it('should apply transform functions in the order they were concatenated', function () {
      const result = fromKey('test').defaultTo(false).toString();
      expect(result.transform(undefined)).to.equal('false');
    });
  });
});
