import React from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, Colors, makeStyles, useTheme } from '@rneui/themed';
import { StackHeaderProps } from '@react-navigation/stack';
import Header from '@/layout/Header';
import { LineAwesomeIcon } from '@/utils/icon';
import { useCallback } from 'react';

function ConversationHeader(props: StackHeaderProps) {
  const { theme } = useTheme();
  const styles = useHeaderStyles({});

  const handleBack = useCallback(() => {
    if (props.navigation.canGoBack()) {
      props.navigation.goBack();
    } else {
      props.navigation.replace('Root');
    }
  }, []);

  return (
    <Header options={props.options} style={styles.container} route={props.route}>
      <Header.Left
        onIconClick={handleBack}
        icon={<LineAwesomeIcon name="angle-left" size={26} color={theme.colors.secondary} />}
      />
      <View style={styles.centerHeader}>
        <View style={styles.titleContainer}>
          <Text style={styles.showName}>张三</Text>
          <View style={styles.onlineStatus}>
            <LineAwesomeIcon name="laptop" size={18} color={theme.colors.primary} />
          </View>
        </View>
        <Text style={styles.description}>最常用的动画类型，使一个</Text>
      </View>
      <Header.Right
        icon={<LineAwesomeIcon name="ellipsis-h" size={26} color={theme.colors.secondary} />}
      />
    </Header>
  );
}

const useHeaderStyles = makeStyles((theme: { colors: Colors }) => ({
  container: {
    alignItems: 'flex-start',
  },
  showName: {
    fontSize: 16,
    lineHeight: 22,
    color: theme.colors.black,
    fontWeight: '400',
  },
  description: {
    marginTop: 2,
    fontSize: 12,
    color: theme.colors.grey2,
  },
  centerHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  onlineStatus: {
    marginLeft: 4,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

export default ConversationHeader;
