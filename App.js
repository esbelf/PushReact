/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import PushNotificationIOS from '@react-native-community/push-notification-ios';

// PushNotificationIOS.addEventListener(type, handler);

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerCalledTimes: 0,
      deviceToken: null,
    };
    this._registerToken.bind(this);
  }
  componentDidMount() {
    PushNotificationIOS.requestPermissions();
    PushNotificationIOS.addEventListener('register', this._registerToken);
  }

  _registerToken(deviceToken) {
    console.log('_registerToken called', deviceToken);
    var registerCalledTimes = this.state.registerCalledTimes;
    this.setState({
      registerCalledTimes: ++registerCalledTimes,
      deviceToken: deviceToken,
    });
  }

  _showPermissions() {
    PushNotificationIOS.checkPermissions(permissions => {
      this.setState({permissions});
    });
  }

  render() {
    const {registerCalledTimes, deviceToken} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Push React App</Text>
          <Text>Register listener called: {registerCalledTimes} times</Text>
          <Text>Device Token: {deviceToken}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
