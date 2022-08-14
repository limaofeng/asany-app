import React from 'react';
import { View, Text } from 'react-native';
import {
  Colors,
  Input as EuiInput,
  InputProps as EuiInputProps,
  makeStyles,
  useTheme,
} from '@rneui/themed';
import { LineAwesomeIcon } from '@/utils/icon';

type InputNumberProps = {
  type: 'phone';
} & EuiInputProps;

function InputNumber(props: InputNumberProps) {
  const styles = useStyles();

  return (
    <View>
      <EuiInput
        {...props}
        placeholder="请输入手机号码"
        leftIcon={
          <View style={styles.areaCode}>
            <Text style={[styles.text, { marginRight: 4}]}>+86</Text>
            <LineAwesomeIcon size={18} name="angle-down" />
          </View>
        }
        keyboardType="number-pad"
        containerStyle={[styles.inputContainer, props.containerStyle]}
        inputStyle={[styles.text, props.inputStyle]}
        inputContainerStyle={[styles.inputInnerContainer, props.inputContainerStyle]}
      />
    </View>
  );
}

const useStyles = makeStyles((theme: { colors: Colors }) => ({
  areaCode: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  inputContainer: {
    height: 46,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  inputInnerContainer: {
    // height: '100%',
    borderColor: theme.colors.greyOutline,
  },
  text: {
    fontSize: 22,
    color: theme.colors.black,
  },
}));

export default InputNumber;
