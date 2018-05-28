import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Picker,
  TextInput,
  Platform
} from 'react-native';
import {
  Slider,
  Divider
} from 'react-native-elements';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import BarbellVideo from '../Camera/BarbellVideo';

class AddPostContent extends Component {
  static uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  static navigationOptions({ navigation }) {
    const headerTitle = 'Post Details';
    const params = navigation.state.params || {};
    return ({
      headerTitle: headerTitle,
      headerRight: <TouchableOpacity onPress={() => {
      params.postLift();
    }}>
    <Text style={{ marginRight: 20 }}>Post Lift</Text></TouchableOpacity> });
  }
  static renderAsset(asset) {
    if (asset.indexOf('mov') > 0) {
      return (
        <View style={{
          height: 60,
          width: 60,
          margin: 15
        }}
        >
          <BarbellVideo video={asset} />
        </View>
      );
    }
    return (
      <Image
        style={{
          height: 60,
          width: 60,
          margin: 15,
          resizeMode: 'contain'
        }}
        source={{ uri: asset }}
      />
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      liftDescription: null,
      liftType: "Bench",
      rpe: 5,
      postAsset: props.navigation.state.params.postAsset ? this.props.navigation.state.params.postAsset : 'https://placeimg.com/640/480/any'
    };
    this.savePost = this.savePost.bind(this);
    this.addFileToUser = this.addFileToUser.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }
  componentWillMount() {
    this.props.navigation.setParams({ postLift: () => {
      this.savePost();
    } });
  }

  addFileToUser(assetUrl) {
    const post = {
      user: this.props.AuthReducer.user.userRef.data().uid,
      assetUrl: assetUrl,
      assetType: this.props.navigation.state.params.postAssetType,
      liftDescription: this.state.liftDescription,
      liftType: this.state.liftType,
      rpe: this.state.rpe
    };

    const ref = firebase.firestore().collection('posts');
    ref.add(post);
  }

  uploadFile(blob) {
    const { uid } = this.props.AuthReducer.user.userRef.data();
    const hash = AddPostContent.uuidv4();
    const metadata = {
      contentType: 'video/quicktime',
      contentDisposition: ''
    };
    firebase.storage()
      .ref(`${uid}/${hash}`)
      .putFile(blob.blobPath, metadata)
      .then((uploadedFile) => {
        this.addFileToUser(uploadedFile.downloadURL);
      });
  }

  async savePost() {
    this.props.navigation.navigate('Profile');
    const { Blob } = RNFetchBlob.polyfill;
    const { fs } = RNFetchBlob;
    const that = this;
    // console.log('here', this.props.navigation.state.params.postAsset);
    let filePath = null;
    const audioDataUri = null;
    if (Platform.OS === 'ios') {
      const arr = this.props.navigation.state.params.postAsset.split('/');
      const { dirs } = RNFetchBlob.fs;
      filePath = `${dirs.CacheDir}/Camera/${arr[arr.length - 1]}`;
    } else {
      filePath = audioDataUri;
    }
    fs.readFile(filePath, 'base64')
      .then((data) => {
        return Blob.build(data, { type: 'video/quicktime;BASE64' });
      })
      .then((blob) => {
        that.uploadFile(blob);
      }).catch((err) => {
        console.log(err.message, err.code);
      });
  }
  render() {
    const asset = AddPostContent.renderAsset(this.state.postAsset);
    return (
      <View style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          { asset }
          <Image
            style={{
              height: 60,
              width: 60,
              margin: 15
            }}
            source={{ uri: this.state.postImage }}
          />
          <TextInput
            onChangeText={(liftDescription) => this.setState({liftDescription})}
            multiline
            placeholder="Lift Description..."
            numberOfLines={3}
            style={{ height: 60, padding: 10, marginTop: 15, marginRight: 15, flex: 1 }}
          />
        </View>
        <Divider style={{ backgroundColor: 'lightgrey', height: 1 }} />
        <View style={{ flex: 1, display: 'flex' }}>
          <Picker
            style={{ height: 90 }} itemStyle={{ height: 90}}
            selectedValue={this.state.liftType}
            onValueChange={(itemValue) => this.setState({liftType: itemValue})}
          >
            <Picker.Item label="Squat" value="Squat" />
            <Picker.Item label="Bench" value="Bench" />
            <Picker.Item label="Deadlift" value="Deadlift" />
          </Picker>
          <Slider
          style={{ width: '80%' }}
            minimumValue={4}
            maximumValue={11}
            step={0.5}
            value={this.state.rpe}
            onValueChange={(rpe) => this.setState({rpe})}
          />
          <Text>RPE {this.state.rpe}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(AddPostContent);
