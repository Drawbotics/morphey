import { expect } from 'chai';
import { defaultTo, toString, toNumber, toInteger, toFloat, toBoolean, mapFrom, using } from '../../src/utils';


describe('UTILS', function () {
  describe('defaultTo(defaultValue)', function () {
    it('should return a function', function () {
      expect(defaultTo('')).to.be.a('function');
    });
    describe('the returned function', function () {
      it('should default to the specified value when null is received as first argument', function () {
        expect(defaultTo('default')(undefined)).to.equal('default');
        expect(defaultTo(0)(undefined)).to.equal(0);
        expect(defaultTo(false)(undefined)).to.equal(false);
      });
      it('shuld return the value received as first argument if it\'s not null', function () {
        expect(defaultTo('default')('not null')).to.equal('not null');
      });
    });
  });
  describe('toString(value)', function () {
    it('should tranform the value into a string', function () {
      expect(toString(121)).to.equal('121');
      expect(toString(true)).to.equal('true');
      expect(toString({})).to.equal('[object Object]');
    });
  });
  describe('toNumber(value)', function () {
    it('should tranform the value into a number', function () {
      expect(toNumber('121')).to.equal(121);
      expect(toNumber('121.12')).to.equal(121.12);
      expect(toNumber(121)).to.equal(121);
      expect(toNumber(121.12)).to.equal(121.12);
    });
    it('should throw an error when the value cannot be transform into a number', function () {
      expect(() => toNumber('asdfad')).to.throw(/Cannot transform/);
    });
  });
  describe('toFloat(value)', function () {
    it('should tranform the value into a float', function () {
      expect(toFloat('121')).to.equal(121.0);
      expect(toFloat('121.12')).to.equal(121.12);
      expect(toFloat(121)).to.equal(121.0);
      expect(toFloat(121.12)).to.equal(121.12);
    });
    it('should throw an error when the value cannot be transform into a float', function () {
      expect(() => toFloat('asdfad')).to.throw(/Cannot transform/);
    });
  });
  describe('toInteger(value)', function () {
    it('should tranform the value into an integer', function () {
      expect(toInteger('121')).to.equal(121);
      expect(toInteger('121.12')).to.equal(121);
      expect(toInteger(121)).to.equal(121);
      expect(toInteger(121.12)).to.equal(121);
    });
    it('should throw an error when the value cannot be transform into an integer', function () {
      expect(() => toInteger('asdfad')).to.throw(/Cannot transform/);
    });
  });
  describe('toBoolean(value)', function () {
    it('should tranform the value into a boolean', function () {
      expect(toBoolean('true')).to.equal(true);
      expect(toBoolean('false')).to.equal(false);
      expect(toBoolean(true)).to.equal(true);
      expect(toBoolean(false)).to.equal(false);
    });
    it('should throw an error when the value cannot be transform into a boolean', function () {
      expect(() => toBoolean('asdfad')).to.throw(/Cannot transform/);
    });
  });
  describe('mapFrom(mapping)', function () {
    it('should return a function', function () {
      expect(mapFrom({})).to.be.a('function');
    });
    describe('the returned function', function () {
      it('should map the value received as first argument using the mapping', function () {
        expect(mapFrom({ test: 'mapped value' })('test')).to.equal('mapped value');
        expect(mapFrom({ 1: 'mapped value' })(1)).to.equal('mapped value');
        expect(mapFrom({ [false]: 'mapped value' })(false)).to.equal('mapped value');
      });
    });
  });
  describe('using(fn)', function () {
    it('should return a function', function () {
      expect(using(() => ({}))).to.be.a('function');
    });
    it('should apply the function `fn` to the value', function () {
      expect(using((v) => v * 2)(2)).to.equal(4);
    });
  });
});
