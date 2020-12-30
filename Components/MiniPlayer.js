import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { Entypo, AntDesign } from "react-native-vector-icons";
import Animated, { set } from "react-native-reanimated";
import {
  useTrackPause,
  useTrackPlay,
  usePlayerStoreActions,
  usePlayerLoadedState,
  useStoreMaxState,
  useSetStoreOpenMax,
  } from '../Context/TarckContext'
import { fifty, forty, forty_five, ten } from "../Config/Dimensions";
import TrackPlayer, {
  useTrackPlayerEvents, 
  TrackPlayerEvents,
  
} from 'react-native-track-player'
import {Colors} from '../assets/colors'




const { height, width } = Dimensions.get("window");
const MIN_PLAYER_H = height * 0.085;
const IMAGE_HEIGHT = height * 0.05;
const IMAGE_WIDTH = width * 0.11;


const MiniPlayer = ({ animOpacity }) => {
  let {
    minPlayer,
    minPlayerCover,
    minCover,
    minPlayerDetails,
    minPlayerIcon,
  } = styles;
      /// HOOKS 
  const [title, setTitle] = React.useState(null)
  const [artist, setArtist] = React.useState(null)
  const [artWork, setArtwork] = React.useState(null)
  const [update, setUpdate] = React.useState(false)
  const [playState , setplayState] = React.useState(null)
  const lpState = usePlayerLoadedState()
  const storeActions = usePlayerStoreActions()

const openStoreMax = useSetStoreOpenMax()
const storeMaxState = useStoreMaxState()

 

  useTrackPlayerEvents([
    TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
    TrackPlayerEvents.PLAYBACK_STATE,
    ],async ev => {
    if(ev.type == TrackPlayerEvents.PLAYBACK_STATE) {
        await TrackPlayer.getState().then(state=> {
            if(state == 2) {
             setUpdate(true)

            }
            if(state == 3){
              setplayState(true)
              storeActions.play().catch(e=> {
                null
              })
            } if(state != 3){
              setplayState(false)
              storeActions.pause().catch(e=> {
                null
              })
            }
        
        }).catch(()=> null)
    } else if(ev.type == TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
     setUpdate(true)
    }
})

  React.useEffect(()=> {
    let details = true
    
    try{
      if(lpState && details){

        TrackPlayer.getCurrentTrack().then( async index => {
         if(index == null){
           null
         }
         if(index != null){
           const title = (await TrackPlayer.getTrack(index)).title
           const artist = (await TrackPlayer.getTrack(index)).artist
           const artwork = (await TrackPlayer.getTrack(index)).artwork
           setTitle(title)
           setArtist(artist)
           setArtwork(artwork)
         }
        }).catch((E)=>{
          null
        })
      }
  } catch(e){
    null
  }
 
 
    return () => {
      details = false
      setUpdate(false)

    }
  },[update,lpState,storeMaxState])


  const play = useTrackPlay()
  const toPause = useTrackPause()
  const playFunc = () => {
    play()
  }

const pauseFunct = () => {
  toPause()
}

  return (
    <Animated.View style={[minPlayer, { opacity: animOpacity }]}>
      <View style={minCover}>
        <Image
          source={artWork == null ?require('../assets/alternate_image.jpg') : {uri:artWork} }
          // source={require('../assets/alternate_image.jpg')}
          style={minPlayerCover}
        />
      </View>
      <View style={minPlayerDetails}>
    
              <Text 
              numberOfLines={1}
              ellipsizeMode='tail'
              style={{ color: Colors.min_player_choir, fontSize: 14 }}>{
                artist == null ? 'Choir' : artist
              }</Text>
                <Text 
               numberOfLines={1}
               ellipsizeMode='tail'
               style={{ color: Colors.min_player_title, fontSize: 15 }}>{
                 title == null ? 'Title' :  title
               }</Text>
      </View>
      <View style={minPlayerIcon}>
        {playState ? (
          <TouchableOpacity
            style={{ height: forty, width: forty_five, justifyContent: "center" }}
            onPress={pauseFunct}
            activeOpacity={0.5}
          >
            <AntDesign name="pause" size={forty_five} color="#ffffff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ height: forty, width: forty_five, justifyContent: "center" }}
            onPress={playFunc}
            activeOpacity={0.75}
          >
            <Entypo name="controller-play" size={forty_five} color="#ffffff" />
          </TouchableOpacity>

         )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  minCover: {
    flex: 1,
    padding:ten,
    justifyContent: "center",
  },
  minPlayer: {
    width: width,
    height: MIN_PLAYER_H,
    flexDirection: "row",
    borderBottomWidth: 1,
    position: "absolute",
    // backgroundColor: "#353535",
    backgroundColor:Colors.player_Background
  },
  minPlayerCover: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: "cover",
  },
  minPlayerDetails: {
    flex: 5,
    padding: ten,
    justifyContent: "flex-end",
  },
  minPlayerIcon: {
    justifyContent: "center",
    flex: 1,
  },
});

export default MiniPlayer