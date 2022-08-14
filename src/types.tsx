/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Conversation: undefined;
  NotFound: undefined;
  PhoneVerification: {
    phoneNumber: string;
  };
  SetPassword: undefined;
  ForgotPassword: undefined,
  CompletePersonalInformation: undefined;
};

export type BottomTabParamList = {
  [key: string]: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
