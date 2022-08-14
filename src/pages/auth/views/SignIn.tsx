import { Button, Input, Form } from '@/components';
import { Label } from '@/components/Item';
import { RootStackParamList } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import { Colors, makeStyles, Text } from '@rneui/themed';
import React, { useCallback } from 'react';
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { EdgeInsets, useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../components/Logo';
import { useBaseStyles } from '../style';

type SignInProps = StackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn(props: SignInProps) {
  const { height } = useSafeAreaFrame();
  const safeArea = useSafeAreaInsets();
  const baseStyles = useBaseStyles();
  const styles = useStyles(safeArea);

  const handleSignUp = useCallback(() => {
    props.navigation.navigate('SignUp');
  }, []);

  const handleForgot = useCallback(() => {
    props.navigation.navigate('ForgotPassword');
  }, []);

  const handleSignIn = useCallback(() => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Root' }],
    });
  }, []);

  return (
    <SafeAreaView style={baseStyles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', default: undefined })}
        style={[baseStyles.window, { paddingTop: 49 }]}>
        <View style={[baseStyles.container, { marginTop: 32 }]}>
          <Text style={[baseStyles.title, { textAlign: 'center' }]}>欢迎使用万相</Text>
          <Form style={baseStyles.form}>
            <Form.Item label="手机号码">
              <Input.Number type="phone" />
            </Form.Item>
            <Form.Item label="密码">
              <Input.Password />
            </Form.Item>
            <View
              style={[
                { marginTop: 16 },
                baseStyles.flex,
                baseStyles.flexRow,
                baseStyles.justifyContentSpaceBetween,
              ]}>
              <Text onPress={handleForgot} style={[styles.forgotPassword, styles.tip]}>
                忘记密码？
              </Text>
              <View style={styles.noAccount}>
                <Text style={styles.tip}>还没有帐户？</Text>
                <Text onPress={handleSignUp} style={[styles.tip, styles.signUp]}>
                  注册
                </Text>
              </View>
            </View>
            <Button onClick={handleSignIn} style={{ marginTop: 64 }} titleStyle={baseStyles.button}>
              登录
            </Button>
          </Form>
          {/* <Text>手机号码</Text> */}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const useStyles = makeStyles((theme: { colors: Colors }, safeArea: EdgeInsets) => ({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  window: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: 310,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    marginTop: 32,
    width: '100%',
  },
  title: {
    marginTop: 32,
    fontSize: 24,
    lineHeight: 34,
    fontWeight: '700',
    color: theme.colors.black,
  },
  forgotPassword: {
    textAlign: 'center',
  },
  noAccount: {
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
  signUp: {
    marginLeft: 4,
    color: theme.colors.primary,
  },
}));

export default SignIn;
