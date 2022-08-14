import {
  Colors,
  Input as EuiInput,
  InputProps as EuiInputProps,
  makeStyles,
  useTheme,
} from '@rneui/themed';
import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import InputNumber from './InputNumber';
import Password from './Password';

type InputProps = {
  style?: {
    container?: StyleProp<ViewStyle>;
    inputContainer: StyleProp<ViewStyle>;
    input?: StyleProp<TextStyle>;
  };
} & EuiInputProps;

function Input({ style, ...props }: InputProps) {
  const styles = useStyles();

  return (
    <EuiInput
      {...props}
      containerStyle={[styles.inputContainer, style?.container]}
      inputStyle={[styles.input, style?.input]}
      inputContainerStyle={[styles.inputInnerContainer, style?.inputContainer]}
    />
  );
}

const useStyles = makeStyles((theme: { colors: Colors }) => ({
  inputContainer: {
    height: 46,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  inputInnerContainer: {
    height: '100%',
    borderBottomColor:  theme.colors.greyOutline,
  },
  input: {
    fontSize: 16,
    color: theme.colors.black,
    fontWeight: '500',
  },
}));

Input.Number = InputNumber;
Input.Password = Password;

export default Input;
