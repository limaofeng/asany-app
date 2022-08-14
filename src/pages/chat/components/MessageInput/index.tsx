import { LineAwesomeIcon } from '@/utils/icon';
import { Colors, Input, makeStyles, useTheme } from '@rneui/themed';
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Keyboard, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useState } from 'react';

function MessageInput() {
  const { bottom } = useSafeAreaInsets();

  const marginBottom = useRef(new Animated.Value(bottom)).current;

  const {
    theme: { colors },
  } = useTheme();
  const styles = useStyles({ bottom });

  useEffect(() => {
    const keyboardDidShowSub = Keyboard.addListener('keyboardWillShow', (event) => {
      console.log('keyboardDidShow', event);

      Animated.timing(marginBottom, {
        toValue: event.endCoordinates.height,
        duration: event.duration,
        useNativeDriver: false,
      }).start();
    });
    const keyboardDidHideSub = Keyboard.addListener('keyboardWillHide', (event) => {
      Animated.timing(marginBottom, {
        toValue: bottom,
        duration: event.duration,
        useNativeDriver: false,
      }).start();
    });
    return () => {
      keyboardDidShowSub.remove();
      keyboardDidHideSub.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.messageInput, marginBottom: marginBottom }}>
        <TouchableOpacity style={styles.inputVoiceContainer}>
          <MaterialIcons name="keyboard-voice" size={28} color={colors.black} />
        </TouchableOpacity>
        <Input
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          placeholder="输入您的信息"
          inputContainerStyle={styles.inputInnerContainer}
        />
        <TouchableOpacity style={styles.inputVoiceContainer}>
          <LineAwesomeIcon name="smile-o" size={32} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.inputVoiceContainer}>
          <LineAwesomeIcon name="plus-circle" size={32} color={colors.black} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const useStyles = makeStyles((theme: { colors: Colors }, { bottom }: { bottom: number }) => ({
  container: {
    backgroundColor: theme.colors.grey5,
    borderColor: theme.colors.greyOutline,
    borderTopWidth: 1,
  },
  inputContainer: {
    height: 40,
    flex: 1,
    paddingLeft: 4,
  },
  inputInnerContainer: {
    paddingLeft: 14,
    borderBottomWidth: 0,
    height: 40,
    borderRadius: 4,
    backgroundColor: theme.colors.background,
  },
  input: {
    fontSize: 14,
    color: theme.colors.grey0,
    fontWeight: '500',
  },
  messageInput: {
    height: 56,
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 12,
    paddingRight: 16,
    marginBottom: bottom,
    alignItems: 'center',
  },
  inputVoiceContainer: {
    height: 40,
    width: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default MessageInput;
