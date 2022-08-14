import { Colors, makeStyles } from '@rneui/themed';
import React from 'react';
import { Text, View } from 'react-native';
// import Tooltip from '../Tooltip';
// import type { TooltipProps } from '../Tooltip/Tooltip';

import type { FormContextProps } from './context';
import { FormContext } from './context';
import type { RequiredMark } from './Form';
import type { FormLabelAlign } from './typings';

export type WrapperTooltipProps = /*TooltipProps & */ {
  icon?: React.ReactElement;
};

// export type LabelTooltipType = WrapperTooltipProps | React.ReactNode;

function toTooltipProps(tooltip: /*LabelTooltipType*/ any): WrapperTooltipProps | null {
  if (!tooltip) {
    return null;
  }

  if (typeof tooltip === 'object' && !React.isValidElement(tooltip)) {
    return tooltip as WrapperTooltipProps;
  }

  return {
    title: tooltip,
  } as any;
}

export interface FormItemLabelProps {
  colon?: boolean;
  htmlFor?: string;
  label?: React.ReactNode;
  labelAlign?: FormLabelAlign;
  requiredMark?: RequiredMark;
  tooltip?: any;
  className?: string;
}

type TooltipIconProps = {
  className?: string;
};

const TooltipIcon = React.forwardRef(({ className, ...props }: TooltipIconProps, ref: any) => {
  return (
    <i
      ref={ref}
      // className={classnames('fas fa-exclamation-circle ms-2 fs-7', className)}
      {...props}
    />
  );
});

const FormItemLabel: React.FC<FormItemLabelProps & { required?: boolean; prefixCls: string }> = ({
  prefixCls,
  label,
  htmlFor,
  colon,
  required,
  requiredMark,
  className,
  tooltip,
}) => {
  const styles = useStyles();

  if (!label) return null;

  return (
    <FormContext.Consumer key="label">
      {({ vertical, colon: contextColon }: FormContextProps) => {
        let labelChildren = label;
        // Keep label is original where there should have no colon

        // Remove duplicated user input colon
        if (typeof label === 'string') {
          labelChildren = <Text style={styles.text}>{label}</Text>;
        }

        // Tooltip
        const tooltipProps = toTooltipProps(tooltip);
        if (tooltipProps) {
          const { icon = <TooltipIcon />, ...restTooltipProps } = tooltipProps;
          const tooltipNode = React.cloneElement(icon);

          labelChildren = (
            <>
              {required ? <span className="required">{labelChildren}</span> : labelChildren}
              {tooltipNode}
            </>
          );
        }

        // Add required mark if optional
        if (requiredMark === 'optional' && !required) {
          labelChildren = (
            <>
              {labelChildren}
              <span className={`${prefixCls}-item-optional`} title="">
                optional
              </span>
            </>
          );
        }

        // const labelClassName = classNames('form-label', className, {
        //   [`${prefixCls}-item-required`]: required,
        //   [`${prefixCls}-item-required-mark-optional`]: requiredMark === 'optional',
        //   [`${prefixCls}-item-no-colon`]: !computedColon,
        // });

        return (
          <View
            style={styles.container}
            // htmlFor={htmlFor}
            // className={classnames(labelClassName, { required })}
            // title={typeof label === 'string' ? label : ''}
          >
            {labelChildren}
          </View>
        );
      }}
    </FormContext.Consumer>
  );
};

const useStyles = makeStyles((theme: { colors: Colors }) => ({
  container: {
    height: 24
  },
  text: {
    fontSize: 16,
    color: theme.colors.secondary
  }
}));

export default FormItemLabel;
