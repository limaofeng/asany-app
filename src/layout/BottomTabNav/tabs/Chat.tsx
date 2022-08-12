import React from 'react';
import { TabOneParamList, TabTwoParamList } from '@/types';
import { createStackNavigator } from '@react-navigation/stack';
import ChatHome from '@/pages/chat/ChatHome';

export type TabStackParamList = {
  ChatHome: undefined;
};

const TabStack = createStackNavigator<TabStackParamList>();

function Chat() {
  return (
    <TabStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <TabStack.Screen name="ChatHome" component={ChatHome} options={{ headerShown: false }} />
    </TabStack.Navigator>
  );
}

export default Chat;
