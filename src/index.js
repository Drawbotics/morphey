import get from 'lodash/get';
import set from 'lodash/set';
import isPlainObject from 'lodash/isPlainObject';
import cloneDeep from 'lodash/cloneDeep';


function setIn(obj, key, value) {
  return set(cloneDeep(obj), key, value);
}


export function translate(obj, translations) {
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
    else if (isPlainObject(originalKey)) {  // newKey: { fromKey: 'oldKey' }
      const { fromKey, transform } = originalKey;
      const value = get(obj, fromKey);
      return setIn(result, k, transform(value));
    }
    else {
      throw new Error('Only "strings" and "objects" can be used as translation values');
    }
  }, {});
};
