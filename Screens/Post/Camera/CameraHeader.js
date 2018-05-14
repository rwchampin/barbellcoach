import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'react-native-firebase';

class CameraHeader extends Component {
  static uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }
  constructor(props) {
    super(props);
    this.goToAddPostContent = this.goToAddPostContent.bind(this);
    this.savePost = this.savePost.bind(this);
    this.addFileToUser = this.addFileToUser.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }
  goToAddPostContent() {
    this.props.navigation.navigate('AddPostContent', {
      postImage: this.props.postImage
    });
  }
  addFileToUser(imageUrl) {
    const that = this;
    const post = {
      imageUrl: imageUrl,
      liftDescription: this.props.postContent.liftDescription,
      liftType: this.props.postContent.liftType,
      rpe: this.props.postContent.rpe
    }
    this.props.AuthReducer.user.ref.update({
      posts: {
        lifts: [post, ...this.props.AuthReducer.user.data().posts.lifts]
      }
    }).then(() => {
        that.props.navigation.navigate('profile');
    })
  }
  uploadFile(blob) {
     const uid = this.props.AuthReducer.user.data().uid;
     const hash = CameraHeader.uuidv4();
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
    fs.readFile(this.props.postContent.postImage, 'base64')
      .then((data) => {
        return Blob.build(data, {type: 'image/jpg;BASE64'})
      })
      .then((blob) => {
        that.uploadFile(blob)
      })
  }
  render() {
    const headerRight = this.props.post ? (
      <TouchableOpacity onPress={this.savePost}><Text>Post</Text></TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={this.goToAddPostContent}>
        <Text>Next</Text>
      </TouchableOpacity>
    );

    const headerleft = this.props.post ? (
      <TouchableOpacity onPress={() => {this.props.navigation.goBack(null)}}><Text>Back</Text></TouchableOpacity>
    ) : (
      <Text></Text>
    )
    return (
        <View style={{ display: 'flex', flexDirection: 'row', height: 88, backgroundColor: '#f7f7f7', paddingTop: 60, paddingLeft: 20, paddingRight: 20 }}>
          <View style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
            {headerleft}
          </View>
          <View style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            {headerRight}
          </View>
        </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(CameraHeader);
