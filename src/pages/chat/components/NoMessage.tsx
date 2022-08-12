import UndrawEnvelopeN8lc from '@/components/illustrations/UndrawEnvelopeN8lc';
import { Colors, makeStyles, Button, Text } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';

type NoMessageProps = {
  onClick: () => void;
};

function NoMessage(props: NoMessageProps) {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.image}>
          <UndrawEnvelopeN8lc />
        </View>
        <Text style={styles.title}>没有新消息？</Text>
        <Text style={styles.description}>选择顶部的讨论以查看新消息</Text>
        <Button
          onPress={props.onClick}
          color="primary"
          style={styles.startNewDiscussion}
          buttonStyle={styles.startNewDiscussionButton}>
          开始新的讨论
        </Button>
      </View>
    </View>
  );
}

const useStyles = makeStyles((theme: { colors: Colors }) => ({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    maxHeight: 240,
    paddingLeft: 38,
    paddingRight: 38,
  },
  title: {
    marginTop: 28,
    color: theme.colors.black,
    lineHeight: 24,
    fontSize: 20,
    textAlign: 'center',
  },
  description: {
    marginTop: 8,
    color: theme.colors.grey0,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  startNewDiscussion: {
    marginTop: 72,
    height: 46,
    paddingLeft: 60,
    paddingRight: 60,
  },
  startNewDiscussionButton: {
    borderRadius: 4,
  },
}));

export default NoMessage;
