/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import LinkingConfiguration from './LinkingConfiguration';
import NotFoundScreen from '../../screens/NotFoundScreen';
import { RootStackParamList } from '../../types';
import BottomTabNavigator from '../BottomTabNav/BottomTabNavigator';
import Conversation from '@/pages/chat/Conversation';
import ConversationHeader from '@/pages/chat/components/ConversationHeader';
import { PhoneVerification, SetPassword, SignIn, SignUp,ForgotPassword, CompletePersonalInformation } from '@/pages/auth/views';

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="PhoneVerification" component={PhoneVerification} />
      <Stack.Screen name="SetPassword" component={SetPassword} />
      <Stack.Screen name="CompletePersonalInformation" component={CompletePersonalInformation} />
      <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
      <Stack.Screen
        name="Conversation"
        component={Conversation}
        options={{ header: (props) => <ConversationHeader {...props} />, headerShown: true }}
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default Navigation;
