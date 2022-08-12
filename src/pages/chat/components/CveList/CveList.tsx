import { LineAwesomeIcon } from '@/utils/icon';
import { makeStyles, SearchBar, Colors, useTheme, ListItem, Avatar, Text } from '@rneui/themed';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type CveListProps = {
  onCveItemClick: () => void;
};

function CveList(props: CveListProps) {
  const { onCveItemClick } = props;

  const { top, bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const {
    theme: { colors },
  } = useTheme();
  const searchBarStyles = useSearchBarStyles();
  const listItemStyles = useListItemStyles();

  return (
    <View>
      <SearchBar
        style={{ padding: 0 }}
        placeholder="搜索..."
        searchIcon={<LineAwesomeIcon size={18} color={colors.secondary} name="search" />}
        leftIconContainerStyle={searchBarStyles.leftIconContainer}
        inputStyle={searchBarStyles.input}
        inputContainerStyle={searchBarStyles.inputContainer}
        containerStyle={searchBarStyles.container}
      />
      <ScrollView style={{height: '100%'}}>
        {[1, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <ListItem
            onPress={onCveItemClick}
            key={item}
            bottomDivider
            containerStyle={listItemStyles.container}>
            <Avatar
              size={48}
              icon={{ name: 'heartbeat', type: 'font-awesome', color: '#f1416c' }}
              containerStyle={{ backgroundColor: '#fff5f8', borderRadius: 12 }}
            />
            <ListItem.Content>
              <ListItem.Title style={listItemStyles.titleContainer}>
                <Text style={listItemStyles.title}>尼古拉斯·戈登</Text>
              </ListItem.Title>
              <ListItem.Subtitle style={listItemStyles.subtitle}>
                对于一般的广告主来说户外广告是值得考虑的户外广告
              </ListItem.Subtitle>
            </ListItem.Content>
            <Text style={listItemStyles.time}>12分钟之前</Text>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
}

const useListItemStyles = makeStyles((theme: { colors: Colors }) => ({
  container: {
    paddingLeft: 14,
    paddingTop: 16,
    paddingBottom: 16,
    height: 88,
  },
  titleContainer: {
    width: '100%',
    height: 21,
    lineHeight: 21,
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.black,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    flex: 1,
  },
  time: {
    position: 'absolute',
    top: 16,
    right: 12,
    fontSize: 12,
    height: 21,
    lineHeight: 21,
    color: theme.colors.grey0,
  },
  subtitle: {
    marginTop: 2,
    color: theme.colors.grey0,
    fontSize: 13,
  },
}));

const useSearchBarStyles = makeStyles((theme: { colors: Colors }) => ({
  container: {
    backgroundColor: theme.colors.grey4,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingLeft: 16,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIconContainer: {
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontSize: 14,
    lineHeight: 18,
  },
  inputContainer: {
    backgroundColor: 'transparent',
  },
}));

export default CveList;
