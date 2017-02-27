import get from 'lodash/get';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';

import From from './from';


function setIn(obj, key, value) {
  return set(cloneDeep(obj), key, value);
}


export from from './from';


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
    else if (originalKey.hasOwnProperty('fromKey')) {  // newKey: { fromKey: 'oldKey' }
      const { fromKey, transform } = originalKey;
      const value = get(obj, fromKey);
      return setIn(result, k, (typeof transform === 'function') ? transform(value) : value);
    }
    else if (originalKey.hasOwnProperty('value')) {
      const { value } = originalKey;
      return setIn(result, k, value());
    }
    else if (originalKey instanceof From) {
      console.log('test');
    }
    else {
      throw new Error('Only "strings" and "objects" can be used as translation values');
    }
  }, {});
};
