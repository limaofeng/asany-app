import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { Avatar, Colors, makeStyles, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import * as Icon from '../../utils/icon';
import Header, { useStyles } from './CustomHeader';

function BottomTabHeader(props: BottomTabHeaderProps) {
  console.log('ScreenHeader');
  const { options, route } = props;

  const { theme } = useTheme();
  const { top } = useSafeAreaInsets();

  const title = options.title || route.name;

  const styles = useStyles({ top });

  return (
    <Header options={options} route={route}>
      <Header.Left
        title={title}
        icon={<Icon.LineAwesomeIcon name="navicon" size={26} color={theme.colors.secondary} />}
      />
      <Header.Right>
        <View style={styles.more}>
          <Icon.LineAwesomeIcon name="ellipsis-h" size={26} color={theme.colors.secondary} />
        </View>
        <Avatar
          size={32}
          icon={{ name: 'heartbeat', type: 'font-awesome', color: '#f1416c' }}
          containerStyle={{ backgroundColor: '#fff5f8', borderRadius: 8 }}
        />
      </Header.Right>
    </Header>
  );
}

export default BottomTabHeader;
