import { getParentOfType, getType, Instance, types } from 'mobx-state-tree';
import { escapeRegexTokens, getIn } from '../utils';
import { Form } from './form';
import {
  createFieldValidation,
  Validation
} from '../features/validation/model';

export const Field = types
  .model('Field', {
    name: types.string,
    _value: types.frozen(),
    _fallbackInitialValue: types.frozen(),
    _everBlured: types.boolean,
    _everFocused: types.boolean,
    type: types.maybe(types.literal('array')),
    _show: types.boolean,
    _disabled: types.boolean,
    active: types.boolean,

    // features
    validation: Validation,
    ignored: types.boolean
  })
  .actions((self) => ({
    setValue(val: any) {
      self._value = val;
    },
    setFallbackInitialValue(val: any) {
      self._fallbackInitialValue = val;
    },
    setType(type?: 'array') {
      self.type = type;
    },
    setShow(shouldShow: boolean) {
      self._show = shouldShow;
    },
    setDisabled(disabled: boolean) {
      self._disabled = disabled;
    },
    setIgnored(ignored: boolean) {
      self.ignored = ignored;
    }
  }))
  .views((self) => {
    function getVal(val: any, arrayUndefinedValue?: any) {
      if (self.type === 'array') {
        return val === undefined
          ? arrayUndefinedValue
          : Array.isArray(val)
          ? [...val]
          : [val];
      } else {
        return val === '' ? undefined : val;
      }
    }
    return {
      get value(): any {
        return getVal(self._value, []);
      },
      set value(val: any) {
        self.setValue(val);
      },
      get show(): boolean {
        return self._show;
      },
      set show(val: boolean) {
        self.setShow(val);
      },
      get disabled(): boolean {
        return self._disabled;
      },
      set disabled(val: boolean) {
        self.setDisabled(val);
      },
      get initialValue(): any {
        return (
          getVal(self._fallbackInitialValue) ??
          getVal(
            getIn(getParentOfType(self, Form)._fallbackInitialValues, self.name)
          ) ??
          (self.type === 'array' ? [] : undefined)
        );
      },
      get touched(): boolean {
        return self._everBlured && self._everFocused;
      },
      get visited(): boolean {
        return self._everFocused;
      }
    };
  })
  .actions((self) => ({
    blur() {
      if (!self._everBlured) {
        self._everBlured = true;
      }
      if (self.active) {
        self.active = false;
      }
    },
    focus() {
      if (!self._everFocused) {
        self._everFocused = true;
      }
      if (!self.active) {
        self.active = true;
      }
    },
    resetFlags() {
      self._everBlured = false;
      self._everFocused = false;
      self.active = false;
    },
    toArray() {
      self._value = [self.value];
    },
    push(val?: any) {
      if (!Array.isArray(self.value)) {
        throw new Error(
          `Cannot use "push" action since the value of "${self.name}" is NOT an array. Try to use field(...).toArray() to convert.`
        );
      }
      self._value = [...self.value, val];
    },
    pop() {
      if (!Array.isArray(self.value)) {
        throw new Error(
          `Cannot use "pop" action since the value of "${self.name}" is NOT an array. Try to use field(...).toArray() to convert.`
        );
      }
      if (!self.value.length) {
        return [];
      }
      const removedIndex = self.value.length - 1;

      const clone = [...self.value];
      const result = clone.pop();

      self._value = clone;
      if (removedIndex) {
        const pattern = new RegExp(
          `^${escapeRegexTokens(self.name)}\\[${removedIndex}].*`
        );
        const form = getParentOfType(self, Form);
        for (const key of form.fields.keys()) {
          if (pattern.test(key)) {
            form.removeField(key);
          }
        }
      }

      return result;
    }
  }));

export interface FieldConfig {
  name: string;
  initialValue?: any;
  type?: 'array';
}

export interface FieldRegisterConfig extends Omit<FieldConfig, 'name'> {}

export type FieldInstance = Instance<typeof Field>;

export function isFieldInstance(o: any): o is FieldInstance {
  return getType(o) === Field;
}

export function createField({
  name,
  initialValue: _fallbackInitialValue,
  type
}: FieldConfig): FieldInstance {
  return Field.create({
    name,
    _everBlured: false,
    _everFocused: false,
    _fallbackInitialValue,
    type,
    _show: true,
    _disabled: false,
    active: false,
    ignored: false,
    validation: createFieldValidation()
  });
}
