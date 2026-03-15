function parsePath(path) {
  return Array.isArray(path) ? path : String(path).split('.');
}


function get(obj, path) {
  const parts = parsePath(path);
  let current = obj;
  for (let i = 0; i < parts.length; i++) {
    if (current == null) return undefined;
    current = current[parts[i]];
  }
  return current;
}


function cloneDeep(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(cloneDeep);
  const result = {};
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    result[keys[i]] = cloneDeep(obj[keys[i]]);
  }
  return result;
}


function set(obj, path, value) {
  const parts = parsePath(path);
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (current[part] == null || typeof current[part] !== 'object') {
      current[part] = {};
    }
    current = current[part];
  }
  current[parts[parts.length - 1]] = value;
  return obj;
}


function isSafePath(key) {
  return parsePath(key).every((p) => p !== '__proto__' && p !== 'constructor' && p !== 'prototype');
}


function setIn(obj, key, value) {
  if ( ! isSafePath(key)) {
    throw new Error(`Unsafe key path: "${key}"`);
  }
  return set(cloneDeep(obj), key, value);
}


export { default as fromKey } from './from.js';

export { default as fromValue } from './from-value.js';


export default function morphey(obj, translations) {
  const finalTranslations = typeof translations === 'function' ? translations(obj) : translations;
  return Object.keys(finalTranslations).reduce((result, k) => {
    const originalKey = finalTranslations[k];
    if ( ! originalKey) {
      return result;
    }
    if (typeof originalKey === 'string') {  // newKey: 'oldKey'
      const value = get(obj, originalKey);
      return setIn(result, k, value);
    }
    else if (originalKey.isFromValue) {
      return setIn(result, k, originalKey.value);
    }
    else if (originalKey.isFromKey || originalKey.hasOwnProperty('fromKey')) {  // newKey: { fromKey: 'oldKey' }
      const { fromKey, transform } = originalKey;
      const value = get(obj, fromKey);
      return setIn(result, k, (typeof transform === 'function') ? transform(value) : value);
    }
    else if (originalKey.hasOwnProperty('value')) {
      const { value } = originalKey;
      return setIn(result, k, value());
    }
    else {
      throw new Error(`Only "strings" and "objects" can be used as translation values. Received ${originalKey} for key ${k}`);
    }
  }, {});
};
