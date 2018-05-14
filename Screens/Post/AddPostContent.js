import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Picker,
  TextInput
} from 'react-native';
import {
  FormInput,
  Slider,
  Divider
} from 'react-native-elements';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'react-native-firebase';
import Camera from './Camera/Camera';
import { connect } from 'react-redux';

class AddPostContent extends Component {
  static uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }
  static navigationOptions({ navigation }) {
    const headerTitle = 'Post Details';
    const params = navigation.state.params || {};
    return ({ headerTitle: headerTitle, headerRight: <TouchableOpacity onPress={() => {
      params.postLift();
    }}><Text style={{ marginRight: 20 }}>Post Lift</Text></TouchableOpacity> });
  }
  constructor(props) {
    super(props);
    this.state = {
      liftDescription: null,
      liftType: "Bench",
      rpe: 5,
      postImage:  props.navigation.state.params.postImage ? this.props.navigation.state.params.postImage : 'https://placeimg.com/640/480/any'
    }
    this.savePost = this.savePost.bind(this);
    this.addFileToUser = this.addFileToUser.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }
  componentWillMount() {
    this.props.navigation.setParams({ postLift: () => {
      this.savePost();
    }});
  }

  addFileToUser(imageUrl) {
    const that = this;
    const post = {
      imageUrl: imageUrl,
      liftDescription: this.state.liftDescription,
      liftType: this.state.liftType,
      rpe: this.state.rpe
    }

    this.props.AuthReducer.user.ref.update({
      posts: {
        lifts: [post, ...this.props.AuthReducer.user.data().posts.lifts]
      }
    });
    that.props.navigation.navigate('Profile');
  }
  uploadFile(blob) {
     const uid = this.props.AuthReducer.user.data().uid;
     const hash = AddPostContent.uuidv4();
     const that = this;

     firebase.storage()
       .ref(`${uid}/${hash}`)
       .putFile(blob.blobPath)
       .then(uploadedFile => {
         this.addFileToUser(uploadedFile.downloadURL);
       })
       .catch(err => {
           //Error

       });
   }
  savePost() {
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    const that = this;
    fs.readFile(this.props.navigation.state.params.postImage, 'base64')
      .then((data) => {
        return Blob.build(data, {type: 'image/jpg;BASE64'})
      })
      .then((blob) => {
        that.uploadFile(blob)
      })
  }
  render() {
    return (
      <View style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
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
