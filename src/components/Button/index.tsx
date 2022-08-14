import React from 'react';
import { Button as EuiButton, Colors, makeStyles } from '@rneui/themed';
import { StringOmit } from '@rneui/base/dist/helpers';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

type ButtonProps = {
  containerStyle?: StyleProp<ViewStyle> | undefined;
  style?: StyleProp<ViewStyle> | undefined;
  titleStyle?: StyleProp<TextStyle> | undefined;
  color?: StringOmit<'primary' | 'secondary' | 'success' | 'error' | 'warning'>;
  onClick?: () => void;
  children: React.ReactNode;
};

function Button(props: ButtonProps) {
  const { onClick, children } = props;
  const styles = useStyles();
  return (
    <EuiButton
      onPress={onClick}
      containerStyle={[styles.containerStyle, props.containerStyle]}
      color={props.color}
      style={[styles.style, props.style]}
      titleStyle={props.titleStyle}
      buttonStyle={styles.buttonStyle}>
      {children}
    </EuiButton>
  );
}

const useStyles = makeStyles((theme: { colors: Colors }) => ({
  containerStyle: {
  },
  style: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  buttonStyle: {
    height: 46,
    borderRadius: 4,
  },
}));

export default Button;
