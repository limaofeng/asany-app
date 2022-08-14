import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Colors, makeStyles, Text, useTheme } from '@rneui/themed';
import {
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  SafeAreaView,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { Input, Button, Form } from '@/components';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Header from '@/layout/Header';
import { LineAwesomeIcon } from '@/utils/icon';
import { RootStackParamList } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import { useBaseStyles } from '../style';

const CELL_COUNT = 6;

type PhoneVerificationProps = StackScreenProps<RootStackParamList, 'PhoneVerification'>;

function PhoneVerification(props: PhoneVerificationProps) {
  const { theme } = useTheme();
  const baseStyles = useBaseStyles();
  const styles = useStyles();
  const smsStyles = useSmsStyles();

  const smsCode1 = useRef<TextInput>(null);
  const smsCode2 = useRef<TextInput>(null);
  const smsCode3 = useRef<TextInput>(null);
  const smsCode4 = useRef<TextInput>(null);

  const smsRefs = useRef([smsCode1, smsCode2, smsCode3, smsCode4]);
  const [code, setCode] = useState(['', '', '', '']);

  const handleSmsCode = useCallback(
    (index: number) => (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      console.log('handleSmsCode', index, e.nativeEvent.key);
      if (e.nativeEvent.key == 'Backspace') {
        setCode((preState) => {
          preState[index] = '';
          return [...preState];
        });
        if (index > 0) {
          smsRefs.current[index - 1].current?.focus();
        }
        return;
      }
      setCode((preState) => {
        preState[index] = e.nativeEvent.key;
        return [...preState];
      });
      if (index < 3) {
        console.log('index', index, smsRefs.current[index + 1]);
        smsRefs.current[index + 1].current?.focus();
      }
      e.stopPropagation();
      e.preventDefault();
      return false;
    },
    []
  );

  useEffect(() => {
    console.log(smsCode1);
  }, []);

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [smsProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleGoBack = useCallback(() => {
    props.navigation.goBack();
  }, []);

  const handleNext = useCallback(() => {
    props.navigation.navigate('SetPassword');
  }, []);

  return (
    <SafeAreaView style={baseStyles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', default: undefined })}
        style={baseStyles.window}>
        <View style={baseStyles.container}>
          <TouchableOpacity onPress={handleGoBack} style={baseStyles.goBack}>
            <LineAwesomeIcon name="arrow-left" size={32} color={theme.colors.primary} />
          </TouchableOpacity>
          <View
            style={{
              paddingLeft: 18,
              marginBottom: 0,
            }}>
            <Text style={[baseStyles.title]}>验证码已发送至手机</Text>
            <Text style={styles.phoneNumber}>+86 15921884771</Text>
          </View>
          <Form style={[baseStyles.form, { marginTop: 16 }]}>
            <Form.Item label="请输入验证码">
              <CodeField
                ref={ref}
                {...smsProps}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <View
                    key={index}
                    style={[smsStyles.cell, isFocused && smsStyles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    <Text
                      style={{
                        borderWidth: 0,
                        width: 46,
                        height: 46,
                        lineHeight: 44,
                        fontSize: 24,
                        textAlign: 'center',
                      }}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                )}
              />
            </Form.Item>
            <View style={[baseStyles.flex, baseStyles.flexRow, { marginTop: 16 }]}>
              <Text style={[styles.tip, styles.primaryColor]}>0S</Text>
              <Text style={styles.tip}>后, </Text>
              <Text style={[styles.tip, styles.primaryColor]}>重新发送</Text>
            </View>
            <Button onClick={handleNext} style={{ marginTop: 64 }} titleStyle={baseStyles.button}>
              下一步
            </Button>
          </Form>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const useStyles = makeStyles((theme: { colors: Colors }) => ({
  phoneNumber: {
    fontSize: 18,
    lineHeight: 24,
    color: theme.colors.primary,
  },
  form: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    lineHeight: 34,
    fontWeight: '700',
    color: theme.colors.black,
  },
  forgotPassword: {
    marginTop: 24,
    textAlign: 'center',
  },
  noAccount: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tip: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: theme.colors.secondary,
  },
  primaryColor: {
    color: theme.colors.primary,
  },
}));

const useSmsStyles = makeStyles((theme: { colors: Colors }) => ({
  cell: {
    width: 46,
    height: 46,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.greyOutline,
  },
  focusCell: {
    borderBottomColor: theme.colors.primary,
  },
}));

export default PhoneVerification;
