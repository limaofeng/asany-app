import React, { useMemo } from 'react';

import type { FormInstance } from 'rc-field-form';
import FieldForm, { List } from 'rc-field-form';
import { View } from 'react-native';
import type { FormProps as RcFormProps } from 'rc-field-form/lib/Form';
import type { ValidateErrorEntity } from 'rc-field-form/lib/interface';
// import type { Options } from 'scroll-into-view-if-needed';

import type { FormContextProps } from './context';
import { FormContext } from './context';
import useForm from './hooks/useForm';
import { StyleProp, ViewStyle } from 'react-native';
import { Store } from './typings';

export type RequiredMark = boolean | 'optional';
export type FormLayout = 'horizontal' | 'inline' | 'vertical';

export type SizeType = 'xs' | 'sm' | 'lg';
declare type RenderProps = (values: Store, form: FormInstance) => JSX.Element | React.ReactNode;
export interface FormProps<Values = any> /*extends Omit<RcFormProps<Values>, 'form'>*/ {
  prefixCls?: string;
  colon?: boolean;
  name?: string;
  layout?: FormLayout;
  form?: FormInstance<Values>;
  size?: SizeType;
  style?: StyleProp<ViewStyle> | undefined;
  children?: RenderProps | React.ReactNode;
  component?: false | string | React.FC<any> | React.ComponentClass<any>;
  requiredMark?: RequiredMark;
  onFinishFailed?: (errorInfo: ValidateErrorEntity<Values>) => void;
}

const InternalForm: React.ForwardRefRenderFunction<FormInstance, FormProps> = (props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    component = View,
    size,
    form,
    colon,
    layout = 'vertical',
    // scrollToFirstError,
    requiredMark,
    onFinishFailed,
    name,
    ...restFormProps
  } = props;

  const prefixCls = 'asany-form';

  // const formClassName = classNames(
  //   prefixCls,
  //   {
  //     [`${prefixCls}-${layout}`]: !!layout,
  //     //   [`${prefixCls}-hide-required-mark`]: requiredMark === false,
  //     //   [`${prefixCls}-rtl`]: direction === 'rtl',
  //     [`${prefixCls}-${size}`]: size,
  //   },
  //   className,
  // );

  const wrapForm = useForm(form as any);
  const { __INTERNAL__ } = wrapForm;
  __INTERNAL__.name = name;

  const formContextValue = useMemo<FormContextProps>(
    () => ({
      name,
      vertical: layout === 'vertical',
      size,
      colon,
      requiredMark,
      itemRef: __INTERNAL__.itemRef,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name, layout, size, colon, requiredMark]
  );

  React.useImperativeHandle(ref, () => wrapForm);

  const onInternalFinishFailed = (errorInfo: ValidateErrorEntity) => {
    onFinishFailed?.(errorInfo);

    // let defaultScrollToFirstError: Options = { block: 'nearest' };

    // if (scrollToFirstError && errorInfo.errorFields.length) {
    //   if (typeof scrollToFirstError === 'object') {
    //     defaultScrollToFirstError = scrollToFirstError;
    //   }
    //   wrapForm.scrollToField(errorInfo.errorFields[0].name, defaultScrollToFirstError);
    // }
  };

  return (
    <FormContext.Provider value={formContextValue}>
      {React.createElement(FieldForm, {
        id: name,
        component,
        ...restFormProps,
        name,
        onFinishFailed: onInternalFinishFailed,
        form: wrapForm,
      } as any)}
    </FormContext.Provider>
  );
};

const Form = React.forwardRef<FormInstance, FormProps>(InternalForm) as <Values = any>(
  props: React.PropsWithChildren<FormProps<Values>> & { ref?: React.Ref<FormInstance<Values>> }
) => React.ReactElement;

export { useForm, List };

export default Form;
