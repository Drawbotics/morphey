import isEmpty from 'lodash/isEmpty';


export function defaultTo(default) {
  return (v) => ( ! v) ? default : v;
}


export function toString(value) {
  return value.toString ? value.toString() : String(value);
}


export function toNumber(value) {
}


export function toInteger(value) {
}


export function toFloat(value) {
}


export function toBoolean(value) {
}


export function mapFrom(mapping) {
}
