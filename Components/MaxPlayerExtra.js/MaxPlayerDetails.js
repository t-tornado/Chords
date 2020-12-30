import React, {useState} from 'react'
import {
    View,
    Text,

} from 'react-native'
import {
    MaterialCommunityIcons,
    FontAwesome5,
    Entypo
} from 'react-native-vector-icons'
import TrackPlayer, {useTrackPlayerEvents, TrackPlayerEvents, STATE_READY} from 'react-native-track-player'

export const TrackDetails = () => {
   
    const [title, setTitle] = React.useState(null)
    const [artist, setArtist] = React.useState(null)
    const [artWork, setArtwork] = React.useState(null)
    const [comp, setComp] = React.useState(null)
    const [ready, setReady] = React.useState(false)

    useTrackPlayerEvents([
        TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
        TrackPlayerEvents.PLAYBACK_STATE,
        ],async ev => {
        if(ev.type == TrackPlayerEvents.PLAYBACK_STATE) {
            await TrackPlayer.getState().then(state=> {
                if(state == STATE_READY) {
                    TrackPlayer.getCurrentTrack().then( async id => {
                        const title = (await TrackPlayer.getTrack(id)).title
                        const artist = (await TrackPlayer.getTrack(id)).artist
                        const art = (await TrackPlayer.getTrack(id)).artwork
                        const composer = (await TrackPlayer.getTrack(id)).description
                        setTitle(title)
                        setArtist(artist)
                        setArtwork(art)
                        setComp(composer)
                    }).catch(() => null)
                }
            }).catch(()=> null)
        } else if(ev.type == TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
             TrackPlayer.getCurrentTrack().then( async id => {
                const title = (await TrackPlayer.getTrack(id)).title
                const artist = (await TrackPlayer.getTrack(id)).artist
                const art = (await TrackPlayer.getTrack(id)).artwork
                const composer = (await TrackPlayer.getTrack(id)).description
                setTitle(title)
                setArtist(artist)
                setArtwork(art)
                setComp(composer)
            }).catch(() => null)
        }
    })

    React.useEffect(()=> {
        setReady(true)
        TrackPlayer.getState().then(state=> {
          if(state == STATE_READY) {
              TrackPlayer.getCurrentTrack().then( async id => {
                  const title = (await TrackPlayer.getTrack(id)).title
                  const artist = (await TrackPlayer.getTrack(id)).artist
                  const art = (await TrackPlayer.getTrack(id)).artwork
                  const composer = (await TrackPlayer.getTrack(id)).description
                  setTitle(title)
                  setArtist(artist)
                  setArtwork(art)
                  setComp(composer)
              }).catch(() => null)
          }
      }).catch(()=> null)
        return () => {
          setReady(false)
        }
      },[ready])
    
          return (
            <View>
              <View style={{
                flexDirection: 'row',
                flex:1,
                justifyContent: 'flex-start',
                alignItems: 'center',          
                
              }}>
                <MaterialCommunityIcons name='format-title' color='orange' size={13} />
    <Text 
    numberOfLines={2}
    style={{
    paddingBottom:5,
       color: "#f9f7cf", fontSize: 20,
      }}>{title == undefined ? '  Title' : `  ${title}`}</Text>
        </View>
    
     <View style={{
                flexDirection: 'row',
                flex:1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingBottom: 0,
                
              }}>
                <FontAwesome5 name='book-reader' color='red' size={10} />
    <Text 
    numberOfLines={2}
    style={{
       color: "#FAA307", fontSize: 14,
      }}>{composer == undefined ? '    by Composer' : `    by ${composer}`}</Text>
        </View>
    <View
    style={{
      flexDirection: 'row',
      flex:1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    
    }}>
    <Entypo name='modern-mic' color='orange' size={10} />
      <Text 
      numberOfLines={2}
      style={{ 
        color: "#e6e7e8" ,
         fontSize: 18,
          paddingBottom:5,
        }}> {
        artist == undefined ? '  Choir' : `  ${artist}`
    }</Text>
        </View>
    </View>  
          )
          }