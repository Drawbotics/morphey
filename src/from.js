import * as utils from './utils';


function compose(f, g) {
  return (x) => g(f(x));
}


export class From {
  constructor(fromKey, transform=(v) => v) {
    this.isFrom = true;
    this.fromKey = fromKey;
    this.transform = transform;
  }

  defaultTo(defaultValue) {
    const defaultTo = utils.defaultTo(defaultValue);
    return new From(this.fromKey, compose(this.transform, defaultTo));
  }

  toString() {
    return new From(this.fromKey, compose(this.transform, utils.toString));
  }

  toNumber() {
    return new From(this.fromKey, compose(this.transform, utils.toNumber));
  }

  toInteger() {
    return new From(this.fromKey, compose(this.transform, utils.toInteger));
  }

  toFloat() {
    return new From(this.fromKey, compose(this.transform, utils.toFloat));
  }

  toBoolean() {
    return new From(this.fromKey, compose(this.transform, utils.toBoolean));
  }

  mapFrom(mapping) {
    const mapFrom = utils.mapFrom(mapping);
    return new From(this.fromKey, compose(this.transform, mapFrom));
  }
}


export default function from(fromKey) {
  return new From(fromKey);
}
