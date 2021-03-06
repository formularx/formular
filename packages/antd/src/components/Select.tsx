import React from 'react';
import { asAtomField, remainOwnEventHandler } from '@formular/react';
import AntdSelect, { SelectProps } from 'antd/lib/select';

export const Select = asAtomField<SelectProps<string | number>>(
  ({ field }, componentProps) => {
    const computedProps = {
      onSearch: remainOwnEventHandler(componentProps.onSearch, (val: any) => {
        field.hotState.search = val;
      })
    } as Partial<{
      onSearch: (...args: any[]) => void;
    }>;
    if (!componentProps.showSearch) {
      delete computedProps.onSearch;
    }
    return {
      ...componentProps,
      ...computedProps,
      mode: undefined,
      options: Array.isArray(field.enum) ? [...field.enum] : field.enum,
      disabled: field.disabled ?? componentProps.disabled,
      loading: field.loading ?? componentProps.loading
    };
  },
  ({ field }, { finalEmptyContent }) => {
    let text: string | undefined = undefined;
    if (Array.isArray(field.enum)) {
      text = field.enum
        .filter(({ value }) => field.value === value)
        .map(({ label }) => label)
        .pop();
    }
    return <span>{text ?? finalEmptyContent}</span>;
  },
  {
    mutateFromEvent(change, val) {
      change(val);
    }
  }
)(AntdSelect);
