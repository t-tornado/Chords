import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { 
  Foundation, 
  FontAwesome5,
  Entypo,
  AntDesign, 
  MaterialCommunityIcons,
  MaterialIcons, } from "react-native-vector-icons";
import Animated from "react-native-reanimated";

import {
  useResetLoadedStates,
   useTrackPlay,
    useTrackPause, 
    useTrackNext, 
    useTrackPrev,
     usePlayerStoreActions,
    Duration,
    usePlayerLoadedState,
    useOpenQueue,
    useRefreshPlayer,
} from '../Context/TarckContext'
import { 
  eighteen, 
  eighty, 
  eleven, 
  fifteen, 
  fifty, 
  five, 
  forty,
  forty_five, 
  fourteen, 
  ninety_five, 
  seventeen, 
  ten, 
  thirteen, 
  thirty, 
  thirty_three, 
  three, 
  twenty,
  twenty_eight,
  twenty_five} from "../Config/Dimensions";
import TrackPlayer, {useTrackPlayerEvents, TrackPlayerEvents} from 'react-native-track-player'
import LikeButton from './MaxPlayerExtra.js/LikeButton'
import RepeatButton from './MaxPlayerExtra.js/RepeatButton'
import LoopButton from './MaxPlayerExtra.js/LoopButton'
import DownloadButton from './MaxPlayerExtra.js/DownloadButton'
import Progress from './MaxPlayerExtra.js/Progress'
import { Colors } from "../assets/colors";

const { height, width } = Dimensions.get("window");
const IMAGE_HEIGHT = height * 0.32;
const IMAGE_WIDTH = width * 0.6;
const OPTIONS_H = height * 0.1

const MaxPlayer = ({
  animHeight,
  animOpacity,
  aIcons,
  minimize,
  navigation
}) => {
  let {
      countDown,
    details,
    maxIconsBottom,
    maxIconsBottomEach,
    maxPlayer,
    maxPlayerCover,
    maxPlayerDetails,
    maxPlayerIcons,
    maxPlayerImage,
    topOption,
    maxPlayerOptions
  } = styles;

      /// HOOKS

const [title, setTitle] = React.useState(null)
const [artist, setArtist] = React.useState(null)
const [artWork, setArtwork] = React.useState(null)
const [comp, setComp] = React.useState(null)
const lpState = usePlayerLoadedState()
const [updated, setUpdated ] = React.useState(false)
const [playing, setPlaying] = React.useState(null)
const [buffering, setBuffering] = React.useState(false)
const storeActions = usePlayerStoreActions()
const openQueue = useOpenQueue()
const play = useTrackPlay()
const pause = useTrackPause()
const previous = useTrackPrev()
const next = useTrackNext()


/*
Registring Component to player events
*/
useTrackPlayerEvents([
  TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
  TrackPlayerEvents.PLAYBACK_STATE,
  ],async ev => {
  if(ev.type == TrackPlayerEvents.PLAYBACK_STATE) {
      await TrackPlayer.getState().then(state=> {
        
          if(state == TrackPlayer.STATE_READY) {
              setUpdated(true)
          } 
          
           if(state == 3){
            setPlaying(true)
            setBuffering(false)
            storeActions.play().catch(e=> null)
          }
           
           if(state != 3  &&
            state != 4 &&
            state != 7 &&
            state != 6
            // state != 0
            ){
            setPlaying(false)
            storeActions.pause().catch(e=> null)
          }
          
          if(state == 6 || state == 7){
           setBuffering(true) 
          }
        
         
      }).catch(()=> null)
  } else if(ev.type == TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
      setUpdated(true)
  }
})

React.useEffect(()=> {
  let cleanUp = true
  try {

    if(lpState &&cleanUp){
      TrackPlayer.getCurrentTrack().then( async index => {
        if(index !=null){

          const title = (await TrackPlayer.getTrack(index)).title
          const artist = (await TrackPlayer.getTrack(index)).artist
          const art = (await TrackPlayer.getTrack(index)).artwork
          const composer = (await TrackPlayer.getTrack(index)).description
            setTitle(title)
            setArtist(artist)
            setArtwork(art)
            setComp(composer)
        }
        if(index == null) { 
          null
        }
                
              
              
           }).catch((E) => {
             null
           })
    }
      } catch (error) {
        null
      }
  return () => {
    cleanUp= false
    setUpdated(false)
  }
},[updated,lpState,playing, buffering])

const toPause = () => {
  pause()
}
const toPlay = () => {
  play()
}
const minFunc = () => {
  minimize()
}
const openView = () => { 
  openQueue()
}
const toNext = () =>{
  next()
}
const toPrev = () =>{
  previous()
}


    return (
      <Animated.View
        style={[maxPlayer, { height: animHeight, opacity: animOpacity }]}
      >
          <ImageBackground 
          // source={artWork == undefined ?require('../assets/alternate_image.jpg') : artWork }
          // source={artWork}/
          // source={artWork == null ?require('../assets/alternate_image.jpg') : artWork}
          source={artWork == null ?require('../assets/alternate_image.jpg') : {uri: artWork} }
          blurRadius={forty}
          style={{
            height: height,
            width: width,
          }}
          imageStyle={{
            width: width,
            resizeMode: 'cover',
          }}
                    
          >
         <View style={topOption}>
           <TouchableOpacity style={{
             height: twenty_eight,
             width: twenty_eight,
             justifyContent: 'center',
             alignItems: 'center',
             marginRight: width * 0.24
           }} 
           activeOpacity={0.87}
           onPress={minFunc}
           >
          <Entypo name='chevron-down' size={twenty_eight} color='#ffffff90' />
           </TouchableOpacity>

<TouchableOpacity style={{
             height: twenty_eight,
             width: twenty_eight,
             justifyContent: 'center',
             alignItems: 'center',
             marginLeft: width * 0.48,
             right:0,
             marginRight:0,
           }}
           onPressOut={openView}
           activeOpacity={0.88}
           >
        <MaterialIcons  name='playlist-play' size={twenty_eight} color='#ffffff90' />
</TouchableOpacity>
           </View>
        <View style={maxPlayerCover}>
          <Image
          // source={artWork == null ?require('../assets/alternate_image.jpg') : artWork}
          source={artWork == null ?require('../assets/alternate_image.jpg') : {uri: artWork} }
            style={maxPlayerImage}
          />
          {/* Player options */}
          <View style={maxPlayerOptions} >
    <View>  
<LikeButton />
  </View>

  <View>
<DownloadButton />
</View>

{/* <View> 
<LoopButton />
</View> */}

<View style={{
  alignItems: 'center'
}} >
  <RepeatButton />
</View>

          </View>
        </View>
        <Animated.View style={[details, { opacity: aIcons }]}>
          <View style={maxPlayerDetails}>
{/*  MAX PLAYER DETAILS*/}
              <View style={styles.titleView}>
                <MaterialCommunityIcons name='format-title' color={Colors.max_player_details_mini_icons}  size={thirteen} />
    <Text 
    numberOfLines={1}
    ellipsizeMode='clip'
    style={{
    paddingBottom:three,
       color: Colors.max_player_details_title_text, fontSize: fifteen,
      }}>{title == null ? '  Title' : `  ${title}`}</Text>
        </View>
    
     <View style={styles.titleView}>
                <FontAwesome5 name='book-reader' color={Colors.max_player_details_mini_icons}  size={ten} />
    <Text 
    numberOfLines={1}
    ellipsizeMode='clip'
    style={{
       color: Colors.max_player_details_composer_text, fontSize: eleven,
      }}>{comp == null ? '   by Composer' : `   by ${comp}`}</Text>
        </View>
    <View
    style={styles.titleView}>
    <Entypo name='modern-mic' color={Colors.max_player_details_mini_icons} size={ten} />
      <Text 
      numberOfLines={2}
      style={{ 
        color: Colors.max_player_details_choir_text,
         fontSize: thirteen, 
          paddingBottom:five,
        }}> {
        artist == null ? '   Choir' : `  ${artist}`
    }</Text>
        </View>
    </View>   

                   <View style={[countDown,{alignSelf: 'center'}]} >
    {/* <TimerComp /> */}
          {/* <Timer /> */}
    {/* <Slider /> */}
    {/* <MaterialCommunityIcons name='progress-clock' size={thirty} color={Colors.max_player_timer_icon} /> */}
    {/* <Duration /> */}
    <Progress />
          </View>
          <View style={[maxPlayerIcons]}>
            <View style={maxIconsBottom}>
              <View style={maxIconsBottomEach}>
              <TouchableOpacity
              activeOpacity={0.7}
                    style={{ width: thirty_three, height: thirty_three, justifyContent: "center"}}
                    onPress={toPrev}
                  >
                <AntDesign name="banckward" size={thirty} color="#ffffff" />
                </TouchableOpacity>
              </View>
              <View style={maxIconsBottomEach}>
{/**PLAYER CONTROLS */}
{playing ? 
 buffering ? 
  (
    <View style={{
      width:eighty,
      height: eighty,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00000060',
      borderRadius:eighty /2
    }} > 
      <Text style={{
        fontSize:ten,
        color: '#ffffff'
      }} >Loading...</Text>
      </View>
  ) :
      (
            <TouchableOpacity
              style={{ width: forty_five, height: forty_five, justifyContent: "center" }}
              activeOpacity={0.6}
              onPress={toPause}
            >
              <AntDesign name="pausecircle" size={forty_five} color="#ffffff" />
            </TouchableOpacity>
          ) : 
           (
            <TouchableOpacity
              style={{ width: forty_five, height: forty_five, justifyContent: "center" }}
              activeOpacity={0.6}
              onPress={toPlay}
            >
              <AntDesign name="play" size={forty_five} color="#ffffff" />
            </TouchableOpacity>
           )}


              </View>
              <View style={maxIconsBottomEach}>
              <TouchableOpacity
              activeOpacity={0.7}
                    style={{ width: thirty_three, height: thirty_three, justifyContent: "center"}}
                    onPress={toNext}
                  >
                <AntDesign name="forward" size={thirty} color="#ffffff" />
                  </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animated.View>
        </ImageBackground>
      </Animated.View>
    );
//   } else if (!playerState.playerRunning) {
//     return null;
//   }
};

const styles = StyleSheet.create({
    countDown:{
        // width: width * 0.5,
        height: height * 0.05,
        // backgroundColor: '#00000040',
         borderRadius: ten,
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: fifteen,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: ten
    },
  details: {
    flex:1,
    justifyContent: 'space-evenly'
  },
  maxIconsBottom: {
    flexDirection: "row",
    flex: 3,
    justifyContent: "center",
    width: width *0.57,
    alignSelf: 'center',
    alignItems: "center",
  },  
  maxIconsBottomEach:{
    width: width * 0.19,
    justifyContent:'center',
    alignItems: 'center'
  },
  maxIconsLast:{
      flexDirection: 'row',
      alignItems: 'center',
      flex:1,
  },
  maxIconsTop: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    flexDirection: 'row'
  },
  maxPlayer: {
    width: width,
    right: 0,
    left: 0,
    // backgroundColor: "#9ab3f5",
  },
  maxPlayerCover: {
    height: height * 0.45,
    width: width,
    alignItems: "center",
    justifyContent: "center",
    
  },
  maxPlayerDetails: {
    height: height * 0.12,
    width: width * 0.8,
    // justifyContent: "space-evenly",
    alignSelf: 'center',
    backgroundColor:'#00000040',
    padding:width * 0.02,
    borderRadius: ten,
    // paddingVertical: height * 0.003
  },
  maxPlayerIcons: {
    height: height * 0.12 ,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'flex-end'
  },
  maxPlayerImage: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    resizeMode: "cover",
    borderRadius: IMAGE_WIDTH / 5,
    borderColor:'#ffffff90',
    borderWidth: ten
  },
  maxPlayerOptions:{
    width: width * 0.85,
    height: OPTIONS_H,
    // backgroundColor: '#00000040',
     borderRadius: (width * 0.2) / 8,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: fifteen,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: ten
  },
  titleText: {
    paddingBottom:5,
    color: "#f9f7cf", fontSize: 20,
  },
  titleView: {
    flexDirection: 'row',
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center', 
  },
  topOption: {
    height: height * 0.11,
    width: width,
    paddingHorizontal: twenty,
    flexDirection:'row',
    alignItems: 'flex-end'
  },
  volumeSlider:{
      width: width * 0.7,
  }
});

export default MaxPlayer