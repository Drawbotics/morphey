# Morphey

A small utility to change keys and values of an object according to another object that describes the transformations.


## Installation

Install it using yarn:

```bash
$ yarn add morphey
```

Or if you're still an old school guy, using npm:

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

This small utility allows to change keys and values of an object according to a description of those changes. This can be useful
in multiple situations. When you need to communicate with an external service through JSON but the keys the service is expecting are
different than the one you want to use, when you want to filter some keys from one step to the other, when you want to sanitize
values or compute some of the them on the fly, etc.

But, why according to a description object? Well, the main motivation is that it's easier to know what's happening
at first glance and second, this provides an unified way of doing this operation that can be shared across the entire team.

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

And all of this without taking into account that every developer in the team can do this differently and the need to repeat this
code everytime someone is going to change the shape of an object.


## API


## LICENSE

MIT. See [LICENSE](LICENSE) for details.
