import React from 'react'
import {
    TouchableOpacity,
    Text
} from  'react-native'
import {MaterialCommunityIcons} from 'react-native-vector-icons'
import TrackPlayer, {useTrackPlayerEvents,TrackPlayerEvents, STATE_READY, STATE_NONE} from 'react-native-track-player'
import {five, twenty_five} from '../../Config/Dimensions'
import {useDownloadedSongs} from '../../Context/TarckContext'
import { Colors } from '../../assets/colors'

const DownloadButton = () => {
const [downloaded, setDownloaded] = React.useState(false)
const [updator, setUpdater] = React.useState(false)
const [pos, setPos] = React.useState(false)
const downloads = useDownloadedSongs()

useTrackPlayerEvents([
    TrackPlayerEvents.PLAYBACK_STATE,
    TrackPlayerEvents.PLAYBACK_TRACK_CHANGED
], async eve => {
    if(eve.type == TrackPlayerEvents.PLAYBACK_STATE){
        await TrackPlayer.getState().then(state => {
            if(state == 3){
                setUpdater(prev => !prev)
            }
        }).catch(()=> null)
    } else if(eve.type == TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
    setPos(prev =>  !prev)
    }
})

React.useEffect(()=> {
    let cleanUp = true

    TrackPlayer.getCurrentTrack().then(async (id)=> {
            await TrackPlayer.getTrack(id).then(res => {
                if(downloads.length == 0 && cleanUp ){
                    setDownloaded(false)
                   
                }
                downloads.forEach(file => {
                    if((file.title == res.title)&&(file.artist == res.artist)&&(file.id == res.id) && cleanUp){
                    setDownloaded(true)
            } 
            else{
                setDownloaded(false)
            }
                })
            }).catch(()=> null)
        }).catch(()=> null)


    return () =>{
        cleanUp = false
        setUpdater(false)

    }
},[updator,pos])




return (
    <>
    <TouchableOpacity style={{alignItems: 'center'}}  activeOpacity={1} >
    <MaterialCommunityIcons name='check-underline' size={twenty_five} color={downloaded ? Colors.max_player_options_icon_active :  Colors.max_player_options_icon_non_active} />
    </TouchableOpacity>
    <Text style={{
    color: '#ffffff80',
    padding: five,
    borderRadius: five,
    }} >Download</Text>
        </>
  )
}

export default DownloadButton