export interface From {
  readonly isFromKey: true;
  readonly fromKey: string;
  readonly transform: (value: any) => any;
  defaultTo(defaultValue: any): From;
  toString(): From;
  toNumber(): From;
  toInteger(): From;
  toFloat(): From;
  toBoolean(): From;
  mapFrom(mapping: Record<string, any>): From;
  using(fn: (value: any) => any): From;
}

export interface FromValue {
  readonly isFromValue: true;
  readonly value: any;
}

export type TranslationValue =
  | string
  | From
  | FromValue
  | { fromKey: string; transform?: (value: any) => any }
  | { value: () => any };

export type Translations =
  | Record<string, TranslationValue>
  | ((obj: Record<string, any>) => Record<string, TranslationValue>);

export function fromKey(key: string): From;
export function fromValue(value: any): FromValue;

export default function morphey(
  obj: Record<string, any>,
  translations: Translations,
): Record<string, any>;
