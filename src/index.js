import get from 'lodash/get';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';


function setIn(obj, key, value) {
  return set(cloneDeep(obj), key, value);
}


export fromKey from './from';

export fromValue from './from-value';


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
