import isEmpty from 'lodash/isEmpty';


export function defaultTo(defaultValue) {
  return (v) => ( ! v) ? defaultValue : v;
}


export function toString(value) {
  if ( ! value) {
    return '';
  }
  return value.toString ? value.toString() : String(value);
}


export function toNumber(value) {
  if (isNaN(value)) {
    throw new Error(`Cannot transform ${value} into a number.`);
  }
  return Number(value);
}


export function toInteger(value) {
  if (isNaN(value)) {
    throw new Error(`Cannot transform ${value} into an integer.`);
  }
  return parseInt(value);
}


export function toFloat(value) {
  if (isNaN(value)) {
    throw new Error(`Cannot transform ${value} into a float.`);
  }
  return parseFloat(value);
}


export function toBoolean(value) {
  if (value !== true && value !== 'true' && value !== 'false' && value !== false) {
    throw new Error(`Cannot transform ${value} into a boolean.`)
  }
  return value === true || value === 'true';
}


export function mapFrom(mapping) {
  if ( ! mapping) {
    throw new Error('The mapping cannot be null.');
  }
  return (value) => {
    if ( ! mapping[value]) {
      throw new Error(`Cannot find value for ${value} in mapping.`);
    }
    return mapping[value];
  };
}
