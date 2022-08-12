import { lightenColor } from '@/utils/color';
import { Avatar, Colors, ListItem, makeStyles, useTheme } from '@rneui/themed';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { View } from 'react-native';

type MessageProps = {
  data: any;
  type: 'in' | 'out';
};

function Message(props: MessageProps) {
  const { type, data } = props;

  const { colors } = useTheme().theme;
  const { width } = useWindowDimensions();
  const styles = useStyles({ width });

  return (
    <ListItem
      pad={8}
      // style={{type ? styles.inboxContainer : styles.outboxContainer}}
      containerStyle={styles.container}>
      <View style={type == 'in' ? styles.inboxContainer : styles.outboxContainer}>
        <Avatar
          size={36}
          icon={{ name: 'heartbeat', type: 'font-awesome', color: '#f1416c' }}
          containerStyle={{
            backgroundColor: '#fff5f8',
            borderRadius: 12,
          }}
        />
        <ListItem.Content
          style={{
            ...styles.content,
            ...(type == 'in'
              ? {
                  backgroundColor: colors.background,
                  marginLeft: 8,
                }
              : {
                  marginRight: 8,
                  backgroundColor: colors.primary,
                }),
          }}>
          <ListItem.Title
            style={{ ...styles.message, color: type == 'in' ? colors.black : colors.background }}>
            {data}: 分页拉取单聊,分页拉取单聊或群聊的
          </ListItem.Title>
        </ListItem.Content>
      </View>
    </ListItem>
  );
}

const useStyles = makeStyles((theme: { colors: Colors }, { width }: { width: number }) => ({
  container: {
    backgroundColor: 'transparent',
  },
  inboxContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  outboxContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  content: {
    flex: 0,
    minHeight: 36,
    maxWidth: width - 32 - 36 - 16,
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
  },
}));

export default Message;
