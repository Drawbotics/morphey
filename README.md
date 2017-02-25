# Morphey

A small utility to change keys and values of an object according to another object that describes the transformations. It's important to notice that this function **doesn't mutate the original object** and returns a new one instead.


## Installation

Install it using yarn:

```bash
$ yarn add morphey
```

Or, if you're an old school guy, using npm:

```bash
$ npm install morphey
```


## Example

A basic usage example:

```js
import morphey from 'morphey';  // or const morphey = require('morphey');


// translations can be a function or an object. If it's a function, the original
// object would be passed as the first arg.
const translations = (obj) => {
  foo: 'bar',
  test: { fromKey: 'old', transform: (v) => v * 2 },
  'deep.x': 'deepX',
  'deep.y': 'deep.deep.Y',
  computed: { value: () => obj.deepX * obj.deep.deep.Y },
};
const initialObject = {
  bar: 123,
  old: 10,
  deepX: 2,
  deep: {
    deep: { Y: 3 },
  },
};
const final = morphey(initialObject, translations);

console.log(final);  // will print
const f = {
  foo: 123,
  test: 20,
  deep: {
    x: 2,
    y: 3,
  },
  computed: 6,
};
```


## Motivation

This small utility allows to change keys and values of an object according to a description of those changes. This can be useful in multiple situations. For example, when you need to communicate with an external service through JSON but the keys the service is expecting are different than the one you want to use, when you want to filter some keys from one object, when you want to sanitize values or compute some of the them on the fly, etc.

But, what's the point of having those transformations in a description object? Well, first of all it makes easier to know what's happening at first glance. Second, this provides an unified way of doing this operation that can be shared across the entire team and across the entire code base.

Basically, it's easier to understand this:

```js
const translations = {
  foo: 'bar',
  test: { fromKey: 'old', transform: (v) => v * 2 },
  'deep.x': 'deepX',
  'deep.y': 'deep.deep.Y',
}
const final = morphey(initialObject, translations);
```

Than this:

```js
const final = Object.keys(initialObject).reduce((memo, k) => {
  if (k === 'bar') {
    return { ...memo, foo: initialObject[k] };
  }
  else if (k === 'old') {
    return { ...memo, test: initialObject[k] * 2 };
  }
  else if (k === 'deepX') {
    return { ...memo, deep: { ...memo.deep, x: initialObject[k] } };
  }
  // It's not possible to easily do deep.y
}, {});
```

And all of this without taking into account that every developer in the team can have his own way of doing this or the need to repeat this code everytime someone is going to change the shape of an object.


## API

#### `morphey(obj, morphs)`

> Creates a new object from `obj` using the transformations in `morphs`.

 - **Parameters**
  - `obj` *Object*: The object to use as a base for the new object.
  - `morphs` *Object|Function*: The transformations to apply to the base object for obtaining the new object.
 - **Returns**
  - *Object*: A new object resulting of applying the transformations to the base object.
  
Transformations descriptions are objects with keys as the new names of the properties of the resulting object and values that describe where to find the data in the original object. This data finding process can be specified using two types of values.

##### Plain strings

If a plain string is used, then, the morphey would look for the data in the key path of the original object indicated by the provided string. For instance, with `const morphs = { newKey: 'oldKey.path' };` morphey will try to find the data in `originalObject.oldKey.path`

##### Objects

If an object is specified, then, according to the properties inside the object, morphey will perform a different operation. If an object with a property called `fromKey` is used, morphey will try to find the data in the key path indicated by `fromKey`. A special config option called `transform` can also be used. This has to be a function that takes a single argument, which is the value in the original object, and has to produce another value which will be used in the new object instead.

An object with a property called `value` can also be used. This property has to be a function that takes zero arguments and has to return a vlaue. In this case, morphey will not try to find data in the original object for the new key and will just use the returned value as the value of the new key.

## License

MIT. See [LICENSE](LICENSE) for details.
