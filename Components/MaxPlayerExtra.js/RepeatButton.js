import React from 'react'
import {
    TouchableOpacity,
    Text
} from  'react-native'
import {MaterialIcons} from 'react-native-vector-icons'
import TrackPlayer, {
  useTrackPlayerEvents, 
  useTrackPlayerProgress,
  TrackPlayerEvents, 
  STATE_READY,
   STATE_NONE} from 'react-native-track-player'
import {five, twenty_five} from '../../Config/Dimensions'
import {Colors} from '../../assets/colors'


const RepeatButton = () => {
const {position, bufferedPosition, duration } = useTrackPlayerProgress(1000)
const [rptState, setRptState] = React.useState(false)
const [repeat, setRepeat] = React.useState(false)
const [pbr,setPbr] = React.useState(false)
const [ready, setReady] = React.useState(false)
 
useTrackPlayerEvents([
  TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
  TrackPlayerEvents.PLAYBACK_STATE
],async ev => {
  if(ev.type == TrackPlayerEvents.PLAYBACK_TRACK_CHANGED){
    setPbr(true)
  } if(ev.type == TrackPlayerEvents.PLAYBACK_STATE){
    await TrackPlayer.getState().then(state => {
      if(state== STATE_READY){
        setReady(true)
      }
      if(state == STATE_NONE && !rptState){
        setPbr(false)
        setReady(false)
      }
    }).catch(()=> null)
  }
})

React.useEffect(()=> {
  let cleanUp = true
if((Math.ceil(position) == Math.floor(duration)) && rptState) {
TrackPlayer.seekTo(0).then(()=>{
if((cleanUp && pbr) || (cleanUp && ready)){
  setRptState(true)
  setRepeat(true)  
}
}).catch((e)=>null)
}
if(ready && pbr && cleanUp){
  setRptState(false)
}

return () => {
  cleanUp = false
  setReady(false)
  setPbr(false)
}
},[rptState,position,ready,pbr])

const pressFunc = () => {
  setRptState(prev => !prev)
  return
}

return (
    <>
<TouchableOpacity onPress={pressFunc} activeOpacity={0.95} >
  <MaterialIcons name='repeat-one' size={twenty_five} color= {rptState ? Colors.max_player_options_icon_active :  Colors.max_player_options_icon_non_active} />
  </TouchableOpacity>
  <Text style={{
    color: '#ffffff80',
    // backgroundColor: '#00000040',
    padding: five,
    borderRadius: five,
  }}>Repeat</Text>
    </>
  )
}

export default RepeatButton