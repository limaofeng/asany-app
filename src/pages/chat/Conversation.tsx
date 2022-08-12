import React from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, Colors, makeStyles, useTheme } from '@rneui/themed';
import { StackHeaderProps } from '@react-navigation/stack';
import Header from '@/layout/Header';
import { LineAwesomeIcon } from '@/utils/icon';
import { useCallback } from 'react';
import Message from './components/Message';
import MessageInput from './components/MessageInput';

function Conversation() {
  const { bottom } = useSafeAreaInsets();
  const styles = useStyles({ bottom });
  return (
    <View style={styles.container}>
      <FlatList
        inverted
        data={[
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
        ]}
        renderItem={(item) => (
          <Message key={item.item} data={item.item} type={item.index % 2 == 0 ? 'in' : 'out'} />
        )}
      />
      <MessageInput />
    </View>
  );
}

const useStyles = makeStyles((theme: { colors: Colors }, { bottom }: { bottom: number }) => ({
  container: {
    height: '100%',
    backgroundColor: theme.colors.grey4,
  },
}));

export default Conversation;
