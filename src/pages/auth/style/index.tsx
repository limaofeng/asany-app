import { makeStyles, Colors } from '@rneui/themed';

export const useBaseStyles = makeStyles((theme: { colors: Colors }) => ({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  goBack: {
    width: 46,
    height: 49,
    marginVertical: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    display: 'flex',
  },
  flexRow: {
    flexDirection: 'row',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  justifyContentSpaceBetween: {
    justifyContent: 'space-between',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  window: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 16,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    color: theme.colors.black,
  },
  text: {
    fontSize: 18,
    lineHeight: 24,
    color: theme.colors.secondary,
  },
  button: {
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: 8,
  },
}));
