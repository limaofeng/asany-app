import { Colors, makeStyles } from '@rneui/themed';
import React from 'react';
import { View, Text } from 'react-native';

type ImageUploadProps = {
  width: number;
  height: number;
};

function ImageUpload({ width, height, ...props }: ImageUploadProps) {
  const styles = useStyles();
  return <View style={[styles.container, { width, height }]}></View>;
}

const useStyles = makeStyles((theme: { colors: Colors }) => ({
  container: {
    backgroundColor: theme.colors.secondary,
  },
}));

export default ImageUpload;
