import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {
  Colors,
  Input as EuiInput,
  InputProps as EuiInputProps,
  makeStyles,
  useTheme,
} from '@rneui/themed';
import { LineAwesomeIcon } from '@/utils/icon';

type PasswordProps = {
  placeholder?: string;
  secureTextEntry?: boolean;
};

function Password({
  secureTextEntry: _secureTextEntry = true,
  placeholder = '请输入密码',
  ...props
}: PasswordProps) {
  const styles = useStyles();

  const [secureTextEntry, setSecureTextEntry] = useState(_secureTextEntry);

  const handleToggle = useCallback(() => {
    setSecureTextEntry((s) => !s);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        placeholder={placeholder}
        style={[styles.text]}
        clearButtonMode="never"
        secureTextEntry={secureTextEntry}
      />
      <TouchableOpacity style={styles.iconContainer} onPress={handleToggle} activeOpacity={1}>
        <LineAwesomeIcon
          type="Ionicons"
          style={styles.icon}
          size={24}
          name={secureTextEntry ? 'eye-slash' : 'eye'}
        />
      </TouchableOpacity>
    </View>
  );
}

const useStyles = makeStyles((theme: { colors: Colors }) => ({
  container: {
    // display: 'flex',
    // flexDirection: 'row',
    // alignItems: 'center',
    height: 46,
    // width: '100%',
    borderBottomColor: theme.colors.greyOutline,
    borderBottomWidth: 1,
  },
  text: {
    flex: 1,
    fontSize: 22,
    color: theme.colors.black,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
  icon: {
    marginTop: 2,
    marginRight: 10,
  },
}));

export default Password;
