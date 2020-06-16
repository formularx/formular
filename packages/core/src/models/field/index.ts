import {
  getParentOfType,
  getType,
  Instance,
  types,
  castToSnapshot
} from 'mobx-state-tree';
import { escapeRegexTokens, getIn } from '../../utils';
import { Form } from '../form';
import { createFieldValidation } from '../../features/validation/model';
import {
  FeatureShow,
  FeatureDisabled,
  FeatureLoading,
  FeatureStateFlags,
  FeatureEnum,
  FeatureValidation,
  FeatureFrozenState,
  FeatureHotState,
  FeatureCollection
} from './inner-features';

const Features = types.compose(
  FeatureShow,
  FeatureDisabled,
  FeatureLoading,
  FeatureStateFlags,
  FeatureEnum,
  FeatureValidation,
  FeatureFrozenState,
  FeatureHotState,
  FeatureCollection
);

export const Field = types
  .compose(
    Features,
    types.model({
      name: types.string,
      _value: types.frozen(),
      _fallbackInitialValue: types.frozen(),
      type: types.maybe(types.literal('array'))
    })
  )
  .actions((self) => ({
    setValue(val: any) {
      self._value = val;
      if (self.modified === false) {
        self.modified = true;
      }
    },
    setValueSilently(val: any) {
      self._value = val;
    },
    setFallbackInitialValue(val: any) {
      self._fallbackInitialValue = val;
    },
    setType(type?: 'array') {
      self.type = type;
    },
    __rename(name: string) {
      self.name = name;
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
      get initialValue(): any {
        return (
          getVal(self._fallbackInitialValue) ??
          getVal(
            getIn(getParentOfType(self, Form)._fallbackInitialValues, self.name)
          ) ??
          (self.type === 'array' ? [] : undefined)
        );
      }
    };
  })
  .views((self) => ({
    get silentValue() {
      return self.value;
    },
    set silentValue(val: any) {
      self.setValueSilently(val);
    }
  }))
  .actions((self) => ({
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
    },
    remove(index: number) {
      if (!Array.isArray(self.value)) {
        throw new Error(
          `Cannot use "remove" action since the value of "${self.name}" is NOT an array. Try to use field(...).toArray() to convert.`
        );
      }
      const clone = [...self.value];
      const returnValue = clone[index];
      clone.splice(index, 1);
      self._value = clone;

      const pattern = new RegExp(
        `^${escapeRegexTokens(self.name)}\\[(\\d+)\\](.*)`
      );
      const form = getParentOfType(self, Form);
      for (const key of [...form.fields.keys()]) {
        const tokens = pattern.exec(key);
        if (tokens) {
          const fieldIndex = Number(tokens[1]);
          if (fieldIndex === index) {
            // delete any subfields for this array item
            form.removeField(key);
          } else if (fieldIndex > index) {
            // shift all higher ones down
            const decrementedKey = `${self.name}[${fieldIndex - 1}]${
              tokens[2]
            }`;
            form.renameField(key, decrementedKey);
          }
        }
      }

      return returnValue;
    }
  }))
  .actions((self) => ({
    runInAction(debugName: string, action: (this: typeof self) => any) {
      action.call(self);
    }
  }))
  .named('Field');

type FieldDesignType = typeof Field;
export interface FieldDesignInterface extends FieldDesignType {}

export interface FieldConfig {
  name: string;
  initialValue?: any;
  type?: 'array';
  uid?: string;
}

export interface FieldRegisterConfig extends Omit<FieldConfig, 'name'> {}

export interface FieldInstance extends Instance<FieldDesignInterface> {}

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
    _loading: undefined,
    active: false,
    _ignored: false,
    modified: false,
    _plain: undefined,
    validation: castToSnapshot(createFieldValidation()),
    _frozenState: {}
  });
}