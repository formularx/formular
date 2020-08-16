import React, { useImperativeHandle, useMemo } from 'react';
import {
  createForm,
  shallowEqual,
  SubscribeSetup,
  SubscribeArgs
} from '@formular/core';
import type {
  FormInstance,
  FormConfig,
  OnFinish,
  OnFinishFailed
} from '@formular/core';
import { useConstant, useWhenValueChanges } from '../use';
import { FormInstanceContext } from '../context/FormInstanceContext';
import { PlainConfigContext, PlainConfig } from '../context/PlainConfigContext';
import type { RegistryEntry } from '../registry';
import { useRegistry } from '../hook/useRegistry';
import { RegistryContext } from '../context/RegistryContext';
import { useInnerFieldEffects } from '../hook/useFieldEffects';

export interface FormularRenderProps {
  form: FormInstance;
  handleSubmit: React.FormEventHandler<any>;
}

export interface RenderChildren {
  (renderProps: FormularRenderProps): React.ReactNode;
}

export interface FormularProps<V>
  extends FormConfig<V>,
    PlainConfig,
    RegistryEntry {
  form?: FormInstance;
  children?: React.ReactNode | RenderChildren;
  onFinish?: OnFinish;
  onFinishFailed?: OnFinishFailed;
  effects?: SubscribeSetup<SubscribeArgs>;
}

function isRenderFunction(children: any): children is RenderChildren {
  return typeof children === 'function';
}

export const Formular = React.forwardRef<FormInstance, FormularProps<any>>(
  (
    {
      form: alternateFormInstance,
      perishable,
      initialValues,
      children,
      onFinish,
      onFinishFailed,
      plain,
      messageVariables,
      validateMessages,
      emptyContent,
      fields,
      effects
    },
    ref
  ) => {
    const form = useConstant(
      () =>
        alternateFormInstance ??
        createForm({
          perishable,
          initialValues,
          plain,
          messageVariables,
          validateMessages
        })
    );

    useWhenValueChanges(plain, () => {
      form.setPlain(Boolean(plain));
    });

    useWhenValueChanges(perishable, () => {
      form.setPerishable(Boolean(perishable));
    });

    useWhenValueChanges(
      initialValues,
      () => {
        form.initialize(initialValues);
      },
      shallowEqual
    );

    useWhenValueChanges(
      messageVariables,
      () => {
        form.setMessageVariables(messageVariables);
      },
      shallowEqual
    );

    useWhenValueChanges(
      validateMessages,
      () => {
        form.setValidateMessages(validateMessages);
      },
      shallowEqual
    );

    const handleSubmit: React.FormEventHandler<any> = (event) => {
      if (event) {
        // sometimes not true, e.g. React Native
        if (typeof event.preventDefault === 'function') {
          event.preventDefault();
        }
        if (typeof event.stopPropagation === 'function') {
          // prevent any outer forms from receiving the event too
          event.stopPropagation();
        }
      }
      return form.submit(onFinish, onFinishFailed);
    };

    useImperativeHandle(ref, () => form);

    const plainConfig = useMemo(
      () => ({
        emptyContent: emptyContent ?? ''
      }),
      [emptyContent]
    );

    const [registry] = useRegistry({ fields });

    useInnerFieldEffects(form, effects);

    return (
      <FormInstanceContext.Provider value={form}>
        <PlainConfigContext.Provider value={plainConfig}>
          <RegistryContext.Provider value={registry}>
            <>
              {isRenderFunction(children)
                ? children({ form, handleSubmit })
                : children}
            </>
          </RegistryContext.Provider>
        </PlainConfigContext.Provider>
      </FormInstanceContext.Provider>
    );
  }
);

Formular.displayName = 'Formular';
