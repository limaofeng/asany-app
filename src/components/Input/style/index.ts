import { Colors, makeStyles } from "@rneui/themed";

export const useSolidInputStyles = makeStyles((theme: { colors: Colors }) => ({
  inputContainer: {
    height: 46,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  inputInnerContainer: {
    height: '100%',
    paddingLeft: 14,
    borderWidth: 1,
    borderColor: theme.colors.greyOutline,
    borderRadius: 4,
    backgroundColor: theme.colors.grey5,
  },
  input: {
    fontSize: 14,
    color: theme.colors.grey0,
    fontWeight: '500',
  },
}));
