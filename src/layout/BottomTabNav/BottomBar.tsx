import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useRef } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { makeStyles, Text, Button, useThemeMode, useTheme, Colors } from '@rneui/themed';
import { useWindowDimensions } from 'react-native';
import { useMemo } from 'react';

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { bottom } = useSafeAreaInsets();
  const styles = useStyles({ bottom });
  const tabBarWidthLeft = useRef(new Animated.Value(12.5)).current;

  const { width } = useWindowDimensions();
  const { theme } = useTheme();

  const tabBarWidth = useMemo(
    () => (width - 25) / state.routes.length,
    [width, state.routes.length]
  );

  React.useEffect(() => {
    const tabBarWidthLeftValue = 12.5 + state.index * tabBarWidth;
    Animated.spring(tabBarWidthLeft, {
      toValue: tabBarWidthLeftValue,
      useNativeDriver: false,
    }).start();
  }, [state.index, tabBarWidth]);

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: any = options.tabBarLabel || options.title || route.name;
        const icon: any = options.tabBarIcon;

        // console.log('xxx', label, icon);
        // console.log('route name', route.name);

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const tabBarColor = isFocused ? theme.colors.primary : theme.colors.secondary;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ ...styles.tabBar }}>
            <View style={styles.icon}>
              {React.createElement(icon, {
                size: 26,
                color: tabBarColor,
              })}
            </View>
            <Text style={{ ...styles.text, color: tabBarColor }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
      <Animated.View style={{ ...styles.indicator, width: tabBarWidth,  left: tabBarWidthLeft }} />
    </View>
  );
}

const useStyles = makeStyles(
  (
    theme: {
      colors: Colors;
    },
    { bottom }: { bottom: number }
  ) => ({
    container: {
      flexDirection: 'row',
      height: 52 + bottom,
      paddingLeft: 12.5,
      paddingRight: 12.5,
      paddingBottom: bottom,
      backgroundColor: theme.colors.background,
      borderColor: '#E8ECEF',
      borderTopWidth: 1,
    },
    tabBar: {
      flex: 1,
      paddingTop: 12,
      paddingBottom: 4,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    icon: {
      height: 26,
      width: 26,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    indicator: {
      position: 'absolute',
      top: -1,
      height: 2,
      borderRadius: 1,
      backgroundColor: theme.colors.primary,
    },
    text: {
      fontSize: 12,
    },
  })
);

export default MyTabBar;
