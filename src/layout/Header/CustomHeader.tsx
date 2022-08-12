import { Avatar, Colors, makeStyles, useTheme } from '@rneui/themed';
import React from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type CustomHeaderProps = {
  options: any;
  route: any;
  children: React.ReactNode;
  style?: ViewStyle;
};

function CustomHeader(props: CustomHeaderProps) {
  const { style } = props;
  const { top } = useSafeAreaInsets();
  const styles = useStyles({ top });

  return (
    <View style={styles.container}>
      <View style={{ ...styles.nav, ...style }}>{props.children}</View>
    </View>
  );
}

type LeftHeaderProps = {
  icon?: React.ReactNode;
  onIconClick?: () => void;
  title?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
};

CustomHeader.Left = function (props: LeftHeaderProps) {
  const { icon, title, children, onIconClick, style } = props;
  const { top } = useSafeAreaInsets();
  const styles = useStyles({ top });
  return (
    <View style={{ ...styles.leftHeader, ...style }}>
      {icon && (
        <TouchableOpacity accessibilityRole="button" onPress={onIconClick} style={styles.navicon}>
          {icon}
        </TouchableOpacity>
      )}
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  );
};

type RightHeaderProps = {
  icon?: React.ReactNode;
  onIconClick?: () => void;
  children?: React.ReactNode;
};

CustomHeader.Right = function (props: RightHeaderProps) {
  const { children, icon, onIconClick } = props;

  const { theme } = useTheme();
  const { top } = useSafeAreaInsets();
  const styles = useStyles({ top });
  return (
    <View style={styles.rightHeader}>
      {children}
      {icon && (
        <TouchableOpacity
          accessibilityRole="button"
          onPress={onIconClick}
          style={{ ...styles.navicon }}>
          {icon}
        </TouchableOpacity>
      )}
    </View>
  );
};

export const useStyles = makeStyles(
  (
    theme: {
      colors: Colors;
    },
    { top }: { top: number }
  ) => ({
    container: {
      height: 44 + top,
      borderBottomColor: '#E8ECEF',
      borderBottomWidth: 1,
      backgroundColor: theme.colors.background,
    },
    nav: {
      marginTop: top,
      height: 44,
      paddingLeft: 16,
      paddingRight: 16,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    leftHeader: {
      position: 'absolute',
      top: 8,
      left: 12,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    navicon: {
      width: 24,
      height: 26,
      position: 'relative',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      marginLeft: 12,
      fontSize: 18,
      fontWeight: '400',
    },
    more: {
      marginRight: 12,
    },
    rightHeader: {
      position: 'absolute',
      right: 12,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      top: 4,
    },
  })
);

export default CustomHeader;
