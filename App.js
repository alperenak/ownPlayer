'use strict';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconsa from 'react-native-vector-icons/Feather'
import Video from "react-native-video"
// import asd  from "react-native-reanimated"
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import React, { Component } from 'react';
import { PermissionsAndroid } from 'react-native';
async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}
requestCameraPermission()
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground, Animated,
  TouchableHighlight, Dimensions, PanResponder, Easing, TouchableWithoutFeedback
} from 'react-native';
import { exportDefaultDeclaration } from '@babel/types';
// import { SSL_OP_ALL } from 'constants';
var { height, width } = Dimensions.get('window');


class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      moveX: 1,
      redStick: 1,
      timek: 0,
      isPaused: true,
      isFullScreen: false,
      position: "relative"
    }

    this.VideoScreen = new VideoScreen(this.state.isPaused, this.state.isFullScreen)
    this.renderSongBox = this.renderSongBox.bind(this)
    this.trunc = this.trunc.bind(this)

  }

  renderSongBox() {

    return (

      //react-native stack navigator libraries npm install

      <View style={[styles.SongBox, { position: this.state.position }]}>

        <TouchableHighlight style={{ width: "100%", height: 75 }} underlayColor="gray" onPress={() => {
          this.props.navigation.navigate('VideoScreen')
        }}>
          <View>




            <View style={{ height: "100%", width: 270 }}>


              <Text style={{ marginLeft: 10, marginTop: 7, fontSize: 18, color: "white" }}>
                {this.trunc("Alperen Karagüzel - React Native Master")}
              </Text>
              <Text style={{ marginLeft: 10, marginTop: 5, fontSize: 15, color: "#717171" }}>
                {this.trunc("Norm Ender")}
              </Text>

            </View>

            <View style={styles.songTime}>
              <Text style={{ fontSize: 15, color: "#717171" }}>
                5.30
  </Text>
            </View>

          </View>

        </TouchableHighlight>

      </View>





    )
  }
  trunc(text) {
    return text.length > 20 ? `${text.substr(0, 30)}...` : text;
  }

  render() {
    return (
      <SafeAreaView>
        <ImageBackground style={{
          width: "100%", height: "100%", position: 'relative',
          top: 0,
          left: 0
        }} source={require("./gifli.gif")}>


          <View style={styles.justifyAlign}>

            <View style={styles.overRegion}>

              <Text style={styles.text}>

                Crazy Music
       </Text>
            </View>
            <TouchableHighlight onPress={() => { this.props.navigation.openDrawer() }}>

              <View style={[styles.instructionsBox, { position: this.state.position }]}>

                <View>

                  <View style={styles.stick}></View>
                  <View style={{ width: "75%", height: 1, borderWidth: 1, marginTop: 10, borderColor: "white" }}></View>
                  <View style={{ width: "75%", height: 1, borderWidth: 1, marginTop: 10, borderColor: "white" }}></View>





                </View>

              </View>

            </TouchableHighlight>


          </View>


          <ScrollView style={{ position: this.state.position }}>

            <View style={{ alignItems: "center" }}>
              {this.renderSongBox()}
              {this.renderSongBox()}
              {this.renderSongBox()}
              {this.renderSongBox()}

            </View >


          </ScrollView>


          {/* <View style={{justifyContent:"center",alignItems:"center"}}>
               <View style={styles.playBar}>
             <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row",flex:1 }}>
               <View style={styles.previous}>
                 <Icon name="backward" size={32} style={{ marginRight: 10 }}></Icon></View>
                 <View style={styles.playRadius}>
                   <Icon name="play" size={50} style={{ marginLeft: 11 }}></Icon>
                  </View>
                 <View style={styles.next}><Icon name="forward" size={32} style={{ marginLeft: 10 }}></Icon></View>
                 <View style={styles.repeatOn}>
                <View><Icons name="repeat" size={30} style={{color:"white"}}></Icons></View>
              <View><Icon name="heart-o" size={30} style={{color:"white",marginTop:25}}></Icon></View>
                 </View>
               </View>

             </View>
</View> */}
          <View style={{ justifyContent: "center", alignItems: "center", position: this.state.position }}>

            <View style={styles.bottomPlay}>
              <View style={{ height: 35, width: "100%", backgroundColor: "transparent", marginTop: 10, position: "absolute" }}></View>

              <View style={{ height: 1, width: "100%", borderWidth: 1, borderColor: "white", marginTop: 32, position: "absolute" }}></View>

              <View style={[styles.redStickMoved, { width: this.state.moveX }]}></View>

              <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", marginTop: 60 }}>
                <View><Icon name="step-backward" size={40 * (50 / 75)} style={{ marginRight: 75 * (50 / 75), color: "white" }}></Icon></View>
                <View><Icon name="backward" size={40 * (50 / 75)} style={{ marginRight: 75 * (50 / 75), color: "white" }}></Icon></View>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                  <Iconsa name="hexagon" size={50} style={{ color: "#E33E3E", transform: [{ rotate: "90deg" }], position: "absolute" }} />
                  <TouchableHighlight onPress={() => { this.setState({ isPaused: !this.state.isPaused, isFullScreen: !this.state.isFullScreen }) }} underlayColor="yellow">
                    <View ><Icon name="play" size={40 * (50 / 75)} style={{ color: "#67ECC3", marginLeft: 8 * (50 / 75) }}></Icon></View>
                  </TouchableHighlight>
                </View>

                <View><Icon name="forward" size={40 * (50 / 75)} style={{ marginLeft: 75 * (50 / 75), color: "white" }}></Icon></View>
                <View><Icon name="step-forward" size={40 * (50 / 75)} style={{ marginLeft: 75 * (50 / 75), color: "white" }}></Icon></View>
              </View>

            </View>


          </View>
        </ImageBackground>
      </SafeAreaView>
    )
  }
}
const overBarHeight = 50
const playRadius = 100
const previousAndNext = 30

const styles = StyleSheet.create({
  justifyAlign: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    flexDirection: "row"
  },
  overRegion: {
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "#717171",
    borderRightWidth: 0,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    height: overBarHeight,
    width: "80%",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white",
    fontWeight: "100",
    fontSize: 25
  },
  instructionsBox: {

    backgroundColor: "black",
    borderColor: "#717171",
    width: 50,
    height: 50,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,

    justifyContent: "center",

  },
  stick: {
    width: "75%",
    height: 1,
    borderColor: "white",
    borderWidth: 1
  },
  playRadius: {
    width: playRadius,
    height: playRadius,
    borderRadius: playRadius / 2,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",

  },
  previous: {
    width: (playRadius + previousAndNext) / 2,
    height: (playRadius + previousAndNext) / 2,
    borderRadius: (playRadius + previousAndNext) / 4,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    transform: [
      { scaleX: 1.2 }
    ],
    backgroundColor: "white",

  },
  next: {
    width: (playRadius + previousAndNext) / 2,
    height: (playRadius + previousAndNext) / 2,
    borderRadius: (playRadius + previousAndNext) / 4,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    transform: [
      { scaleX: 1.2 }
    ],
    backgroundColor: "white",


  },
  playBar: {
    backgroundColor: "black",
    width: "98%",
    height: 120,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#717171"


  },
  repeatOn: {
    marginLeft: 35,



    flexDirection: "column",

  },
  SongBox: {
    width: "90%",
    height: 75,
    borderBottomWidth: 1,
    borderColor: "white",
    flexDirection: "row",
  },
  songTime: {

    marginLeft: 10,
    height: "100%",
    width: "100%",
    justifyContent: "center"
  },
  bottomPlay: {
    height: 100,
    width: "100%",
    backgroundColor: "black",
    borderColor: "#717171",
    borderRadius: 20,
    borderWidth: 1,


    flexDirection: "column"


  },
  redStickMoved: {
    height: 1,
    borderWidth: 1,
    borderColor: "red",
    marginTop: 32,
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,


  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,

  },
});

class VideoScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      myText: 'I\'m ready to get swiped!',
      gestureName: 'none',
      backgroundColor: 'transparent',
      audioOnly: true,
      sayi: 0

    }
    this.onSwipe = this.onSwipe.bind(this)
    this.onSwipeUp = this.onSwipeUp.bind(this)
    this.onSwipeDown = this.onSwipeDown.bind(this)
    this.onSwipeLeft = this.onSwipeLeft.bind(this)
    this.onSwipeRight = this.onSwipeRight.bind(this)

  }
  onSwipeUp(gestureState) {
    this.setState({ myText: 'You swiped up!' });
  }

  onSwipeDown(gestureState) {
    this.setState({ myText: 'You swiped down!' });
  }

  onSwipeLeft(gestureState) {
    this.setState({ myText: 'You swiped left!' });
  }

  onSwipeRight(gestureState) {
    this.setState({ myText: 'You swiped right!' });
  }
  onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({ backgroundColor: 'red', sayi: this.state.sayi + 1 });
        break;
      case SWIPE_DOWN:
        this.setState({ backgroundColor: 'green', sayi: this.state.sayi + 1 });
        break;
      case SWIPE_LEFT:
        this.setState({ backgroundColor: 'blue' });
        break;
      case SWIPE_RIGHT:
        this.setState({ backgroundColor: 'yellow' });
        break;
    }
  }
  renderVideo = () => {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    return (<GestureRecognizer
      onSwipe={this.onSwipe}
      onSwipeUp={this.onSwipeUp}
      onSwipeDown={this.onSwipeDown}
      onSwipeLeft={this.onSwipeLeft}
      onSwipeRight={this.onSwipeRight}
      config={config}
      style={{
        flex: 1,
        backgroundColor: this.state.backgroundColor,
        position: "absolute"
      }}
    >
      <Text>{this.state.myText}</Text>
      <Text>onSwipe callback received gesture: {this.state.gestureName}</Text>
      <Text>onSwipe callback received gesture: {this.state.sayi}</Text>

      <Video source={{ uri: 'file:///sdcard/NurMek.mp3' }}
        // Can be a URL or a local file.
        audioOnly={this.state.audioOnly}
        fullscreen={this.state.audioOnly ? false : true}
        resizeMode="cover"
        fullscreenAutorotate={true}
        repeat={true}
        playInBackground={true}
        playWhenInactive={true}

        paused={false}
        ref={(ref) => {
          this.player = ref
        }}                                      // Store reference
        onBuffer={this.onBuffer}                // Callback when remote video is buffering
        onError={this.videoError}               // Callback when video cannot be loaded
        style={styles.backgroundVideo} />

    </GestureRecognizer>





    )

  }
  render() {

    return (


      <TouchableHighlight
        delayLongPress={1000}
        onLongPress={() => console.log("basılı tutyre")}
        style={{ position: "relative", flex: 1 }}
        underlayColor="black"
      >
        {this.renderVideo()}

      </TouchableHighlight>
    )

  }

}


export class DrawerSc1 extends React.Component {
  render() {
    return (
      <View>
        <Text>Hi Guys</Text>
      </View>

    );


  }
}
// const MyDrawerNavigator = createDrawerNavigator({
//   Home: {
//     screen: HomeScreen,
//   },
//   VideoScreen: {
//     screen: VideoScreen,
//   },
// });
const RootStack = createStackNavigator({
  Home: HomeScreen,
  VideoScreen: VideoScreen,
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }

  },
)


export default createStackNavigator(RootStack)