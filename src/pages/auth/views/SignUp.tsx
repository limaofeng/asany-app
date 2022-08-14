import React, { useCallback, useState } from 'react';
import { Colors, makeStyles, Text, useTheme } from '@rneui/themed';
import { KeyboardAvoidingView, Platform, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Button, Form, Input } from '@/components';
import { RootStackParamList } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import { LineAwesomeIcon } from '@/utils/icon';
import { useBaseStyles } from '../style';

type SignUpProps = StackScreenProps<RootStackParamList, 'SignUp'>;

function SignUp(props: SignUpProps) {
  const { theme } = useTheme();

  const baseStyles = useBaseStyles();
  const styles = useStyles();

  const handleClick = useCallback(() => {
    console.log('props', props);
    props.navigation.navigate('PhoneVerification', { phoneNumber: '15921884771' });
  }, []);

  const handleGoBack = useCallback(() => {
    props.navigation.goBack();
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
          <Text style={[baseStyles.title, { paddingLeft: 18}]}>新用户注册</Text>
          <Form style={baseStyles.form}>
            <Form.Item label="手机号码">
              <Input.Number type="phone" />
            </Form.Item>
            <Button
              style={{ marginTop: 64 }}
              titleStyle={baseStyles.button}
              onClick={handleClick}
              >
                立即注册
            </Button>
          </Form>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const useStyles = makeStyles((theme: { colors: Colors }) => ({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  goBack: {
    width: 46,
    height: 46,
    marginVertical: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    display: 'flex',
  },
  flexRow: {
    flexDirection: 'row',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  window: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 16,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
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
  signIn: {
    marginLeft: 4,
    color: theme.colors.primary,
  },
}));

export default SignUp;
