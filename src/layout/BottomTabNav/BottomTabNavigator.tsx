/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
import { StyleSheet, View, Text } from 'react-native';

import { BottomTabHeaderProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack';
import * as React from 'react';

import TabOneScreen from '../../screens/TabOneScreen';
import TabTwoScreen from '../../screens/TabTwoScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../../types';

import * as Icon from '../../utils/icon';

import BottomBar from './BottomBar';
import { useTheme } from '@rneui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabHeader } from '../Header';
import { Chat } from './tabs';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBar={(props) => <BottomBar {...props} />}
      // tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="chat"
        component={Chat}
        options={{
          title: '消息',
          header: (props) => <BottomTabHeader {...props} />,
          tabBarLabel: '消息',
          tabBarIcon: (props) => <Icon.LineAwesomeIcon name="angle-double-up" {...props} />,
        }}
      />
      <BottomTab.Screen
        name="task"
        component={TabOneNavigator}
        options={{
          tabBarLabel: '协作',
          tabBarIcon: (props) => <Icon.LineAwesomeIcon name="suitcase" {...props} />,
        }}
      />
      <BottomTab.Screen
        name="workbench"
        component={TabTwoNavigator}
        options={{
          tabBarLabel: '工作台',
          tabBarIcon: (props) => <Icon.LineAwesomeIcon name="tachometer" {...props} />,
        }}
      />
      <BottomTab.Screen
        name="contacts"
        component={TabTwo2Navigator}
        options={{
          tabBarLabel: '通讯录',
          tabBarIcon: (props) => <Icon.LineAwesomeIcon name="list-alt" {...props} />,
        }}
      />
      <BottomTab.Screen
        name="me"
        component={TabTwo2Navigator}
        options={{
          tabBarLabel: '我的',
          tabBarIcon: (props) => <Icon.LineAwesomeIcon name="user" {...props} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerShown: false }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}

function TabTwo2Navigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    // height: 86
  },
});
