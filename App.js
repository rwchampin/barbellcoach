import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';
import { Provider } from 'react-redux';
import reducers from './Redux/Reducers';
import { AuthNavigator, AppNavigator } from './router';
import { createStore, combineReducers } from 'redux';
import firebase from 'react-native-firebase';
import { ADD_USER } from './Redux/Actions';

const store = createStore(combineReducers(reducers));

export default class App extends Component {
  constructor(props) {
    super(props);
    this.unsubscriber = null;
    this.state = {
      user: ''
    };
  }
  async componentDidMount() {
    // await firebase.auth().signOut();
    const that = this;
    this.unsubscriber = await firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        that.setState({
          user: ''
        });
        return
      }
      firebase.firestore().collection('userProfiles').where('uid', '==', user._user.uid).get().then((snapshot) => {
        snapshot.forEach((doc) => {
          that.setState({
            user: doc
          });
          store.dispatch({
            type: 'add_user',
            payload: doc
          });
        })
      })

    });
  }
  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }
  render() {
    const route = this.state.user ? <AppNavigator user={this.state.user} /> : <AuthNavigator />;

    return (
      <Provider store={store}>
        { route }
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
