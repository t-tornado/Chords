import React from 'react'
import {
    Text
} from 'react-native'
import TrackPlayer, {useTrackPlayerProgress, useTrackPlayerEvents,TrackPlayerEvents, STATE_READY} from 'react-native-track-player'
import {useTrackDetails} from '../../Context/TarckContext'
const TrackDetails = () => {
    const [title, setTitle] = React.useState(null)
    const [artist, setArtist] = React.useState(null)
    const [ready, setReady] = React.useState(false)
    const details = useTrackDetails()
    // const playerLoaded = useContext(LoadPlayerStateContext)
    
const events = [
TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
TrackPlayerEvents.PLAYBACK_STATE,
]

useTrackPlayerEvents([
    TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
    TrackPlayerEvents.PLAYBACK_STATE,
    ],async ev => {
    if(ev.type == TrackPlayerEvents.PLAYBACK_STATE) {
        // await TrackPlayer.getState().then(state=> {
        //     if(state == STATE_READY) {
        //         TrackPlayer.getCurrentTrack().then( async id => {
        //             const title = (await TrackPlayer.getTrack(id)).title
        //             const artist = (await TrackPlayer.getTrack(id)).artist
        //             setTitle(title)
        //             setArtist(artist)
        //         }).catch(() => null)
        //     }
        // })
        details().then(res => {
                setTitle(res.title)
                setArtist(res.artist )
                // setComposer(res.composer)
                return
              }).catch(e => {
                null
              })
    } else if(ev.type == TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
        //  TrackPlayer.getCurrentTrack().then( async id => {
        //     const title = (await TrackPlayer.getTrack(id)).title
        //     const artist = (await TrackPlayer.getTrack(id)).artist
        //     setTitle(title)
        //     setArtist(artist)
        // }).catch(() => null)
        details().then(res => {
                setTitle(res.title)
                setArtist(res.artist )
                setComposer(res.composer)
                return
              }).catch(e => {
                null
              })
    }
})


React.useEffect(()=> {
    setReady(true)
    details().then(res => {
            setTitle(res.title)
            setArtist(res.artist )
            setComposer(res.composer)
            return
          }).catch(e => {
            null
          })
    return () => {
        setReady(false)
    }
},[ready])
    
        return (
            <>
               <Text 
               numberOfLines={1}
               ellipsizeMode='tail'
               style={{ color: "#ffffff", fontSize: 16 }}>{
                 title == null ? 'Title' :  title
               }</Text>
              <Text 
              numberOfLines={1}
              ellipsizeMode='tail'
              style={{ color: "#FAA307", fontSize: 12 }}>{
                artist == null ? 'Composer' : artist
              }</Text>
            </>
        )
    }


export default TrackDetails