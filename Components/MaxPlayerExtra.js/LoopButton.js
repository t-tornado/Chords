import React from 'react'
import {
    TouchableOpacity,
    Text
} from  'react-native'
import {MaterialIcons} from 'react-native-vector-icons'
import TrackPlayer, {useTrackPlayerEvents,TrackPlayerEvents} from 'react-native-track-player'
import {five, twenty_five} from '../../Config/Dimensions'
import {Colors} from '../../assets/colors'
import { useRefreshPlayer, useResetLoadedStates } from '../../Context/TarckContext'

const RepeatButton = () => {
const [loopState, setLoopState] = React.useState(false)
const [playbackEnd, setPlaybackEnd] = React.useState(false)
const [updated, setUpdated] = React.useState()
const [pbtc, setPb] = React.useState()
const refreshPlayer = useRefreshPlayer()
const resetLoadedStates = useResetLoadedStates()
 
useTrackPlayerEvents([
  TrackPlayerEvents.PLAYBACK_QUEUE_ENDED,
  TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
  TrackPlayerEvents.PLAYBACK_STATE
],async ev => {
  if(ev.type == TrackPlayerEvents.PLAYBACK_QUEUE_ENDED){
    setPlaybackEnd(true)
    setUpdated(true)
  } else if(ev.type == TrackPlayerEvents.PLAYBACK_TRACK_CHANGED){
    setPlaybackEnd(false)
      setPb(true)
      setUpdated(true)
  } else if(ev.type == TrackPlayerEvents.PLAYBACK_STATE) {
    await TrackPlayer.getState().then(state => {
      if(state == STATE_READY){
          setUpdated(true)
      } if(state == STATE_NONE && !loopState){
          setUpdated(false)
          refreshPlayer()
          resetLoadedStates()
      }
  }).catch(()=> null)
  }
} )

// const Func = async () => {
//   await TrackPlayer.getQueue().then(async queue => {
//       await TrackPlayer.skip(queue[0].id).then(()=> {
//           setLoopState(true)
//           setLoop(true)
//       }).catch(()=> null)
//   }).catch(()=> null)
// }

React.useEffect(()=> {
  let cleanUp = true
 if(playbackEnd && loopState && cleanUp){
  try {
    TrackPlayer.getQueue().then(async queue => {
      await TrackPlayer.skip(queue[0].id).then(()=> {
            setLoopState(true)
            setPlaybackEnd(true)
      }).catch(()=> null)
  }).catch(()=> null)
  } catch (error) {
    null
  }
 }
 

return () => {
  cleanUp = false
}
},[loopState,updated,playbackEnd])

const pressFunc = () => {
  setLoopState(prev => !prev)
  return
}

return (
    <>
<TouchableOpacity onPress={pressFunc} activeOpacity={0.95}  >
  <MaterialIcons name='loop' size={twenty_five} color={loopState ? Colors.max_player_options_icon_active :  Colors.max_player_options_icon_non_active} />
</TouchableOpacity>
  <Text style={{
    color: '#ffffff80',
    // backgroundColor: '#00000090',
    padding: five,
    borderRadius: five,
  }}>Loop</Text>
    </>
  )
}

export default RepeatButton