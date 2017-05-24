export class FromValue {
  constructor(value) {
    this.isFromValue = true;
    this.value = value;
  }
}


export default function fromValue(value) {
  return new FromValue(value);
}
