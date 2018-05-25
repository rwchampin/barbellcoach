import React, { Component } from 'react';
import Video from 'react-native-video';

class BarbellVideo extends Component {
  constructor(props) {
    super(props);
    this.onEnd = this.onEnd.bind(this);
  }
  onEnd() {
    
  }
  render() {
    return (
      <Video
        source={{ uri: this.props.video }} // Can be a URL or a local file.
        poster="https://baconmockup.com/300/200/" // uri to an image to display until the video plays
        ref={(ref) => {
         this.player = ref
        }}                                      // Store reference
        rate={1.0}                              // 0 is paused, 1 is normal.
        volume={1.0}                            // 0 is muted, 1 is normal.
        muted={false}                           // Mutes the audio entirely.
        paused={false}                          // Pauses playback entirely.
        resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
        repeat={true}                           // Repeat forever.
        playInBackground={false}                // Audio continues to play when app entering background.
        playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
        ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
        progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
        onBuffer={this.onBuffer}                // Callback when remote video is buffering
        onEnd={this.onEnd}                      // Callback when playback finishes
        onError={this.videoError}               // Callback when video cannot be loaded
        // onFullscreenPlayerWillPresent={this.fullScreenPlayerWillPresent} // Callback before fullscreen starts
        // onFullscreenPlayerDidPresent={this.fullScreenPlayerDidPresent}   // Callback after fullscreen started
        // onFullscreenPlayerWillDismiss={this.fullScreenPlayerWillDismiss} // Callback before fullscreen stops
        // onFullscreenPlayerDidDismiss={this.fullScreenPlayerDidDissmiss}  // Callback after fullscreen stopped
        // onLoadStart={this.loadStart}            // Callback when video starts to load
        // onLoad={this.setDuration}               // Callback when video loads
        // onProgress={this.setTime} // Callback every ~250ms with currentTime
        // onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
        style={{ height: '100%', width: '100%' }}
      />
    );
  }
}

export default BarbellVideo;
