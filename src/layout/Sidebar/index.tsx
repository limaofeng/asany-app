import React, {useState, useRef , useReducer} from 'react';
import { 
  PanResponder,
  PanResponderInstance,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
  ScrollView, StyleSheet, Text, TouchableOpacity, View, AppState } from 'react-native';
// import { NavigationScreenOptions, NavigationScreenProp } from 'react-navigation';

type WindowDimensions = { width: number; height: number };

type Event = {
  nativeEvent: {
    layout: {
      width: number;
      height: number;
    };
  };
};

type State = {
  width: number;
  height: number;
  openOffsetMenuPercentage: number;
  openMenuOffset: number;
  hiddenMenuOffsetPercentage: number;
  hiddenMenuOffset: number;
  left: Animated.Value;
  moving: boolean;
};

const deviceScreen: WindowDimensions = Dimensions.get('window');
const barrierForward: number = deviceScreen.width / 4;

function shouldOpenMenu(dx: number): boolean {
  return dx > barrierForward;
}

interface SideMenuProps {
  edgeHitWidth: number;
  toleranceX: number;
  toleranceY: number;
  menuPosition: 'left' | 'right';
  onChange: (open: boolean) => void;
  onMove?: (value: number) => void;
  children: any;
  menu: any;
  openMenuOffset: number;
  hiddenMenuOffset: number;
  animationStyle?: (value: Animated.Value) => StyleProp<ViewStyle>;
  disableGestures?: () => void | boolean;
  animationFunction?: (prop: Animated.Value, value: number) => Animated.CompositeAnimation;
  onAnimationComplete?: () => void;
  onSliding?: (value: number) => void;
  onStartShouldSetResponderCapture?: () => void;
  isOpen: boolean;
  bounceBackOnOverdraw: boolean;
  autoClosing: boolean;
}

interface SideMenuState {}

//SideMenuProps, SideMenuState

export function SidebarContainer(props: any) {
/*   state: State;
  prevLeft: number;
  isOpen: boolean; */

/*   responder: PanResponderInstance;
  onMoveShouldSetPanResponder: any;
  onPanResponderMove: any;
  onPanResponderRelease: any;
  onPanResponderTerminate: any;
 */

  // constructor(props: SideMenuProps) {
    // super(props);

    const prevLeft = useRef(0);

    const initialMenuPositionMultiplier = props.menuPosition === 'right' ? -1 : 1;
    const openOffsetMenuPercentage = props.openMenuOffset / deviceScreen.width;
    const hiddenMenuOffsetPercentage = props.hiddenMenuOffset / deviceScreen.width;
    const left: Animated.Value = new Animated.Value(
      props.isOpen ? props.openMenuOffset * initialMenuPositionMultiplier : props.hiddenMenuOffset
    );

    const isOpenRef = useRef(!!props.isOpen)

    const isOpen = isOpenRef.current;

    const stateRef = useRef({
      width: deviceScreen.width,
      height: deviceScreen.height,
      openOffsetMenuPercentage,
      openMenuOffset: deviceScreen.width * openOffsetMenuPercentage,
      hiddenMenuOffsetPercentage,
      hiddenMenuOffset: deviceScreen.width * hiddenMenuOffsetPercentage,
      left,
      moving: false
    });

    const state = stateRef.current;

    const setState = (x: any) => {
      stateRef.current = {...stateRef.current, ...x}
      console.log('state', x);
      forceUpdate();
    }

    const [, forceUpdate] = useReducer((s) => s + 1, 0);


    const onMoveShouldSetPanResponder = (e: any, gestureState: any): boolean => {
      if (gesturesAreEnabled()) {
        const x = Math.round(Math.abs(gestureState.dx));
        const y = Math.round(Math.abs(gestureState.dy));
  
        const touchMoved = x > props.toleranceX && y < props.toleranceY;
  
        if (isOpen) {
          return touchMoved;
        }
  
        const withinEdgeHitWidth =
          props.menuPosition === 'right'
            ? gestureState.moveX > deviceScreen.width - props.edgeHitWidth
            : gestureState.moveX < props.edgeHitWidth;
  
        const swipingToOpen = menuPositionMultiplier() * gestureState.dx > 0;
        return withinEdgeHitWidth && touchMoved && swipingToOpen;
      }
  
      return false;
    }
    const onPanResponderMove = (e: Object, gestureState: Object) => {
      if (state.left.__getValue() * menuPositionMultiplier() >= 0) {
        let newLeft = prevLeft.current + gestureState.dx;
  
        if (!props.bounceBackOnOverdraw && Math.abs(newLeft) > state.openMenuOffset) {
          newLeft = menuPositionMultiplier() * state.openMenuOffset;
        }
  
        if (newLeft <= state.openMenuOffset) {
          if (!state.moving) {
            setState({ moving: true });
          }
          props.onMove!(newLeft);
          state.left.setValue(newLeft);
        }
      }
    };
    const handlePanResponderEnd = (e: Object, gestureState: Object) => {
      console.log('gestureState', gestureState, gestureState.dx);
      const offsetLeft = menuPositionMultiplier() * (state.left.__getValue() + gestureState.dx);
      openMenu(shouldOpenMenu(offsetLeft));
      setState({moving: false });

    }
  
    const onPanResponderRelease = handlePanResponderEnd;
    const onPanResponderTerminate = handlePanResponderEnd;

    const responder = PanResponder.create({
      // onStartShouldSetPanResponderCapture: this.handleStartShouldSetResponderCapture,
      onMoveShouldSetPanResponder: onMoveShouldSetPanResponder,
      onPanResponderMove: onPanResponderMove,
      onPanResponderRelease: onPanResponderRelease,
      onPanResponderTerminationRequest: () => {
        console.log('onPanResponderTerminationRequest');
        return true;
      },
      onPanResponderTerminate: onPanResponderTerminate
    });


    state.left.addListener(({ value }) =>
      props.onSliding!(
        Math.abs((value - state.hiddenMenuOffset) / (state.openMenuOffset - state.hiddenMenuOffset))
      )
    );

/*   componentWillReceiveProps(props: SideMenuProps): void {
    if (
      typeof props.isOpen !== 'undefined' &&
      this.isOpen !== props.isOpen &&
      (props.autoClosing || this.isOpen === false)
    ) {
      this.openMenu(props.isOpen);
    }
  }
 */
/*   componentDidMount() {
  } */

   const onLayoutChange = (e: Event) => {
    const { width, height } = e.nativeEvent.layout;
    const openMenuOffset = width * state.openOffsetMenuPercentage;
    const hiddenMenuOffset = width * state.hiddenMenuOffsetPercentage;
    setState({ width, height, openMenuOffset, hiddenMenuOffset });
  }; 

  /**
   * Get content view. This view will be rendered over menu
   * @return {React.Component}
   */
  const getContentView = ()  =>  {
    let overlay = null;
    if (isOpen || state.moving) {
      overlay = (
        <TouchableWithoutFeedback onPress={() => openMenu(false)}>
          <Animated.View
            style={[
              styles.overlay,
              {
                backgroundColor: state.left.interpolate({
                  inputRange: [0, props.openMenuOffset * 0.7, props.openMenuOffset],
                  outputRange: ['rgba(167, 168, 172, 0)', 'rgba(167, 168, 172, 0.1)', 'rgba(167, 168, 172, 0.4)']
                })
              }
            ]}
          />
        </TouchableWithoutFeedback>
      );
    }

    const { width, height } = state;
    // const ref = sideMenu => (this.sideMenu = sideMenu);
    const style = [styles.frontView, { width, height } /*, props.animationStyle(state..left)*/];

    return (
      <Animated.View style={style}>
        {props.children}
        {overlay}
      </Animated.View>
    );
  }

  const moveLeft = (offset: number) => {
    const newOffset = menuPositionMultiplier() * offset;

    props.animationFunction!(state.left, newOffset).start(props.onAnimationComplete);

    prevLeft.current = newOffset;
  }

  const menuPositionMultiplier = (): -1 | 1  => {
    return props.menuPosition === 'right' ? -1 : 1;
  }

  const openMenu = (isOpen: boolean) => {
    console.log('openMenu', isOpen)
    const { hiddenMenuOffset, openMenuOffset } = state;
    moveLeft(isOpen ? openMenuOffset : hiddenMenuOffset);
    isOpenRef.current = isOpen;

    forceUpdate();
    props.onChange(isOpen);
  }

  const gesturesAreEnabled = (): boolean => {
    const { disableGestures } = props;

    if (typeof disableGestures === 'function') {
      return !disableGestures();
    }

    return !disableGestures;
  }

    const boundryStyle =
      props.menuPosition === 'right'
        ? { left: state.width - state.openMenuOffset }
        : { right: state.width - state.openMenuOffset };
    // boundryStyle
    const menu = (
      <View style={[styles.menu, { width: props.openMenuOffset }]}>
        {props.menu}
      </View>
    );

    const animationStyle = props.animationStyle!(state.left);

    return (
      <Animated.View
        {...responder.panHandlers}
        style={[styles.container, { flexDirection: 'row', left: -props.openMenuOffset }, animationStyle]}
        onLayout={onLayoutChange}
      >
        {menu}
        {getContentView()}
      </Animated.View>
    );
}


SidebarContainer.defaultProps = {
  toleranceY: 10,
  toleranceX: 10,
  edgeHitWidth: 60,
  children: null,
  menu: null,
  openMenuOffset: deviceScreen.width * (2 / 3),
  disableGestures: false,
  menuPosition: 'left',
  hiddenMenuOffset: 0,
  onMove: () => {},
  onChange: () => {},
  onSliding: () => {},
  animationStyle: (value: number) => ({
    transform: [
      {
        translateX: value
      }
    ]
  }),
  animationFunction: (prop: Animated.Value, value: number) => {
    return Animated.spring(prop, {
      useNativeDriver: false,
      toValue: value,
      friction: 8
    });
  },
  onAnimationComplete: () => {},
  isOpen: false,
  bounceBackOnOverdraw: true,
  autoClosing: true
};

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    // justifyContent: 'center'
    flex: 1
  },
  menu: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0
  },
  frontView: {
    // flex: 1,
    // position: 'absolute',
    // left: 0,
    // top: 0,
    // backgroundColor: 'transparent',
    // overflow: 'hidden'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent'
  }
});




interface SidebarProps {
  dispatch: any;
  // navigation: NavigationScreenProp<any>;
  // theme: Theme;
  // accounts: Account[];
  openMenu: (open: boolean) => void;
  refreshBill: (account: string) => void;
  changeAccount: (account: string) => void;
  currentAccount: string;
  // instances: Instance[];
}

interface SidebarState {
  // current?: Account;
}


export function Sidebar() {
const colors = { 
  backgroundColorDeeper: '#FEFFFF', 
  minor: '#A7A8AC', 
  backgroundColor: '#F0F1F2', 
  secondary: '#767676',
  major: '#444444' };
  
const handleJumpToServers = () => {

}
const paddingTop = Math.max(30, 0);
  return <View style={{ flex: 1, backgroundColor: colors.backgroundColorDeeper }}>
  <View style={{ flex: 1, flexDirection: 'row' }}>
    <View style={{ width: 70, backgroundColor: '#F0F1F2', paddingTop, alignItems: 'center' }}>
      <View style={{ flex: 1 }}>
        {/* <AllAccountLable testID="all-accounts" light={!current} onClick={this.handleLableClick} /> */}
        {/*accounts.map(a => (
          <AccountLable
            key={a.id}
            light={current && current!.id === a.id}
            logo={CloudManager.getProvider(a.provider).logo}
            value={a}
            onClick={this.handleLableClick}
          />
        ))*/}
        {/* <NewAccountLable testID="new-account" onClick={this.handleJumpToNewAccount} /> */}
      </View>
      <View>
        <TouchableOpacity
          testID="open-settings"
          // accessibilityTraits="button"
          // onPress={this.handleJumpSettings}
          style={{ width: 70, height: 70, alignItems: 'center', justifyContent: 'center' }}
        >
          {/* <Icon type="MaterialIcons" name="settings" color={colors.minor} size={28} /> */}
        </TouchableOpacity>
      </View>
      <View style={{ height:0}} />
    </View>
    <View style={{ paddingTop, flex: 1 }}>
      <View
        style={{
          height: 65,
          borderBottomWidth: 1,
          borderBottomColor: colors.backgroundColor,
          paddingTop: 15,
          paddingLeft: 18,
          justifyContent: 'center',
          paddingBottom: 15
        }}
      >
          <Text style={[{ color: colors.major, fontWeight: 'bold', marginBottom: 5 }, {fontSize: 16}]}>
            All Accounts
          </Text>
      </View>
      <ScrollView style={{ paddingTop: 10 }}>
      <Text>123123</Text>
        {/* <List itemStyle={{ height: 45 }}>
          <Item onClick={handleJumpToServers}>
            <Icon type="Ionicons" name="ios-albums" size={16} color={colors.minor} />
            <Note style={[{ flex: 1 }, {fontSize: 14}]}>Servers</Note>
            <View
              style={{
                paddingHorizontal: 5,
                height: 20,
                marginRight: 15,
                borderRadius: 4,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.backgroundColor
              }}
            >
              <Text style={[{ color: colors.secondary }, {fontSize: 13}]}>12</Text>
            </View>
          </Item>
          <Item visible={true}>
            <Icon type="Ionicons" name="ios-key" size={16} color={colors.minor} />
            <Note style={[{ flex: 1 }, {
      fontSize: 14
    }]}>SSH Keys</Note>
            <View
              style={{
                paddingHorizontal: 5,
                height: 20,
                marginRight: 15,
                borderRadius: 4,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.backgroundColor
              }}
            >
              <Text style={[{ color: colors.secondary }, {
      fontSize: 13
    }]}>2</Text>
            </View>
          </Item>
          <Item testID="keypairs">
            <Icon type="MaterialCommunityIcons" name="key-change" size={16} color={colors.minor} />
            <Note style={[{ flex: 1 }, {
      fontSize: 14
    }]}>Key Pairs</Note>
          </Item>
        </List> */}
      </ScrollView>
      <Text>123123</Text>
        {/* <List
          title="Billing"
          style={{ borderTopColor: '#CBCCCD', borderTopWidth: StyleSheet.hairlineWidth }}
          titleStyle={{ color: colors.secondary }}
        >
          <Item>
            <Label>Balance</Label>
            <Note>0.00</Note>
          </Item>
          <Item>
            <Label>This Month</Label>
            <Note>0.00</Note>
          </Item>
          <Item>
            <Label>Remaining</Label>
            <Note>0.00</Note>
          </Item>
        </List> */}
      <View style={{ height: 0 }} />
    </View>
  </View>
</View>

}

/*
class Sidebar extends React.PureComponent<SidebarProps, SidebarState> {
  static navigationOptions: NavigationScreenOptions = {
    tabBarLabel: 'Sidebar'
  };
  constructor(props: SidebarProps) {
    super(props);
    state. = { current: props.accounts.find(node => node.id === props.currentAccount) };
  }

  componentWillMount() {
    AppState.removeEventListener('change', this.handleReduxStateChange);
  }
  handleReduxStateChange = (appState: string) => {
    if (appState === 'active' && props.currentAccount) {
      props.refreshBill(props.currentAccount);
    }
  };
  componentDidMount() {
    AppState.addEventListener('change', this.handleReduxStateChange);
    if (props.currentAccount) {
      props.refreshBill(props.currentAccount);
    }
  }

  handleAccountManager = () => {
    const { navigation } = this.props;
    navigation.navigate('AccountList');
  };

  handleJumpToServers = () => {
    const { navigation } = this.props;
    const { current } = state.;
    navigation.navigate('server', { data: current });
  };

  handleJumpToKeyPairs = () => {
    const { navigation } = this.props;
    navigation.navigate('KeyPairs');
  };

  handleCreate = () => {
    const { navigation } = this.props;
    navigation.navigate('ChooseProvider', {
      callback: () => {
        navigation.navigate('AccountNew');
      }
    });
  };

  handleJumpToNewAccount = () => {
    const { navigation } = this.props;
    navigation.navigate('AccountNew');
  };

  handleJumpSettings = () => {
    const { navigation } = this.props;
    navigation.navigate('Settings');
    props.openMenu(false);
  };

  handleJumpToSSHKeys = () => {
    const { navigation } = this.props;
    const { current } = this.state;
    navigation.navigate('SSHPublicKeys', { data: current });
  };

  handleLableClick = (account?: Account) => {
    const { changeAccount } = this.props;
    this.setState({ current: account });
    changeAccount(account ? account.id : '');
  };

  render() {
    const { colors, fonts } = props.theme;
    const { accounts, instances } = this.props;
    const { current } = this.state;
    const serversNumber = current ? instances.filter(node => node.account === current.id).length : instances.length;
    const sshkeysNumber = current ? current.sshkeys.length : 0;
    const paddingTop = Math.max(30, SafeArea.top);
    return (
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1'
  }
});
*/