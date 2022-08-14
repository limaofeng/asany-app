import { Colors, makeStyles } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';

function Logo() {
  const styles = useLogoStyles();

  return <View style={styles.container}></View>;
}

const useLogoStyles = makeStyles((theme: { colors: Colors }) => ({
  container: {
    backgroundColor: theme.colors.grey0,
    width: 134,
    height: 146,
  },
}));

export default Logo;
