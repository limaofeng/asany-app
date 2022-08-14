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

type SetPasswordProps = StackScreenProps<RootStackParamList, 'SetPassword'>;

function SetPassword(props: SetPasswordProps) {
  const { theme } = useTheme();
  const baseStyles = useBaseStyles();
  const styles = useStyles();

  const handleGoBack = useCallback(() => {
    props.navigation.goBack();
  }, []);

  const handleNext = useCallback(() => {
    props.navigation.navigate('CompletePersonalInformation');
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
            <Text style={[baseStyles.title]}>请设置账号密码</Text>
            <Text style={styles.phoneNumber}>登录密码用于登录万相</Text>
          </View>
          <Form style={[baseStyles.form, { marginTop: 16 }]}>
            <Form.Item label="密码">
              <Input.Password />
            </Form.Item>
            <View style={[baseStyles.flex, baseStyles.flexRow, { marginTop: 16 }]}>
              <Text style={[styles.tip, styles.primaryColor]}>需要6~20位字符</Text>
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

export default SetPassword;
