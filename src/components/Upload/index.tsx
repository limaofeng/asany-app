import { Colors, makeStyles } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import ImageUpload from './ImageUpload';

type UploadProps = {
  width: number;
  height: number;
};

function Upload({ width, height, ...props }: UploadProps) {
  const styles = useStyles();
  return <View style={[styles.container, { width, height }]}></View>;
}

const useStyles = makeStyles((theme: { colors: Colors }) => ({
  container: {
    backgroundColor: theme.colors.secondary,
  },
}));

Upload.Image = ImageUpload;

export default Upload;
