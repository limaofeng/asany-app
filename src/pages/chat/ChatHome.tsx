import React from 'react';

import { makeStyles, Text, Button, useThemeMode, Colors } from '@rneui/themed';
import { View } from 'react-native';
import { NoMessage, CveList } from './components';
import { useState } from 'react';
import { NavigationHelpers, ParamListBase } from '@react-navigation/native';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import { useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ChatHomeProps = {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};

function ChatHome(props: ChatHomeProps) {
  const { navigation } = props;

  const { bottom } = useSafeAreaInsets();
  const styles = useStyles({bottom});

  const [isNew, setIsNew] = useState(false);

  console.log('props', props);

  const handleCveItemClick = useCallback(() => {
    navigation.navigate('Conversation');
  }, []);

  return (
    <View style={styles.container}>
      {isNew ? (
        <NoMessage onClick={() => setIsNew(false)} />
      ) : (
        <CveList onCveItemClick={handleCveItemClick} />
      )}
    </View>
  );
}

const useStyles = makeStyles((theme: { colors: Colors }, {bottom}: {bottom: number}) => ({
  container: {
    flex: 1,
    display: 'flex',
    paddingBottom: bottom + 12,
  },
}));

export default ChatHome;
