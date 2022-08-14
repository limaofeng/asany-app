import React, { useCallback } from 'react';
import { Colors, makeStyles, Text, useTheme } from '@rneui/themed';
import {
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Input, Button, Form } from '@/components';

import { LineAwesomeIcon } from '@/utils/icon';
import { RootStackParamList } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import { useBaseStyles } from '../style';
import Upload from '@/components/Upload';

type CompletePersonalInformationProps = StackScreenProps<
  RootStackParamList,
  'CompletePersonalInformation'
>;

function CompletePersonalInformation(props: CompletePersonalInformationProps) {
  const { theme } = useTheme();
  const baseStyles = useBaseStyles();
  // const styles = useStyles();

  const handleGoBack = useCallback(() => {
    props.navigation.goBack();
  }, []);

  const handleSignUp = useCallback(() => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Root' }],
    });
  }, []);

  return (
    <View style={baseStyles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', default: undefined })}
        style={[baseStyles.window]}>
        <View style={baseStyles.container}>
          <TouchableOpacity onPress={handleGoBack} style={baseStyles.goBack}>
            <LineAwesomeIcon name="arrow-left" size={32} color={theme.colors.primary} />
          </TouchableOpacity>
          <View
            style={{
              paddingLeft: 18,
              marginBottom: 0,
            }}>
            <Text style={[baseStyles.title]}>欢迎使用万相</Text>
            <Text style={baseStyles.text}>请完善个人信息</Text>
          </View>
          <Form style={[baseStyles.form, { marginTop: 48 }]}>
            <View style={[baseStyles.flex, baseStyles.alignItemsCenter]}>
              <Form.Item noStyle>
                <Upload.Image width={124} height={124} />
              </Form.Item>
            </View>
            <Form.Item label="昵称" style={{ marginTop: 48 }}>
              <Input />
            </Form.Item>
            <Button onClick={handleSignUp} style={{ marginTop: 64 }} titleStyle={baseStyles.button}>
              进入万相
            </Button>
          </Form>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default CompletePersonalInformation;
