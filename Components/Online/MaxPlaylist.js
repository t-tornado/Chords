import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Modal,
    Dimensions,
    TouchableOpacity,
    StatusBar
} from 'react-native'
import {MaterialCommunityIcons} from 'react-native-vector-icons'
import TrackPlayer, {useTrackPlayerEvents, TrackPlayerEvents} from 'react-native-track-player'
import { Colors } from '../../assets/colors'
import { fifteen,  thirty,  five, twenty_eight, ten, eighteen } from '../../Config/Dimensions'
import { useCloseQueue, useQueueState, useSetPlayerQueue, useStoreQueue, useWebSongs } from '../../Context/TarckContext'
import Card from './playlistCard'

const {height, width} = Dimensions.get('window')
const HEADER_H= height * 0.085
const HEADER_W = width

const MaxPlaylist = () => {
const [playId, setPlayId] = React.useState()
const [cleanupId, setCleanupId] = React.useState()
const closeView = useCloseQueue()
const queueState = useQueueState()
const [update,setUpdate] = React.useState(false)
const queueSongs = useStoreQueue()
const closeModal = () => {
    closeView()
}

useTrackPlayerEvents([
    TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
    TrackPlayerEvents.PLAYBACK_STATE,
    ],async ev => {
    if(ev.type == TrackPlayerEvents.PLAYBACK_STATE) {
        await TrackPlayer.getState().then(async state=> {
            if(state ==3) {
           try {
            await TrackPlayer.getCurrentTrack().then(async id => {
                const compareID =  (await TrackPlayer.getTrack(id)).id
            setUpdate(true)
                setPlayId(compareID)
            })
           } catch (error) {
            null
        }
            }  
        
        }).catch(()=> null)
    }  else if(ev.type == TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
        try {
            
            await TrackPlayer.getCurrentTrack().then(async id => {
                const compareID =  (await TrackPlayer.getTrack(id)).id
               setUpdate(true)
                setPlayId(compareID)
            })
        } catch (error) {
            null
        }
  
      }
})


React.useEffect(()=> {
    let clean = true
    if(clean && update){
              setCleanupId(playId)
    }

    return () => clean = false
    },[update,playId,cleanupId,queueSongs])

    return (
        <Modal
        visible={queueState}
        transparent={false}
        style={{flex:1}}
        animationType='slide'
        >
            <View style={styles.container} >
            <View style={styles.header} >
                <TouchableOpacity style={{
                    height: thirty,
                    width: thirty,
                    justifyContent: 'center',
                    alignItems:'center',
                    borderRadius: five,
                    // backgroundColor: '#ffffff80'
                }} 
                onPress={closeModal}
                activeOpacity={0.85}
                >

            <MaterialCommunityIcons name='keyboard-backspace' size={twenty_eight} color='#ffffff' />
                </TouchableOpacity>
                <View 
                style={{
                    flex:1,
                    alignItems:'center',
                    justifyContent: 'center',
                    paddingRight: twenty_eight
                }}
                >

            <Text style={{
                color:'white',
                fontSize: eighteen,
            }} >YOUR LIST</Text>
            <Text 
            style={{
                color:'#ffffff80',
                fontSize: ten
            }}
        >songs: {queueSongs.length }</Text>
                </View>
            </View>
            <View style={styles.details} >
                <FlatList 
                alwaysBounceVertical={true}
                data={queueSongs}
                showsVerticalScrollIndicator={false}
                renderItem={({item,index}) => 
                <Card
                id={item.id}
                key={item.id}
                 duration={item.duration}
                 title={item.title}
                 choir={item.artist}
                 index={index}
                compareID={cleanupId}
               /> }
                />
            </View>
            </View>
            <StatusBar barStyle='light-content' backgroundColor='#000000' />

        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        // height: height,
        // width: width,
        flex:1,
        backgroundColor: Colors.screens_Background
    },
    details: {
        // height: height * 0.9,
        // width: width,
        justifyContent: 'flex-start',
        alignItems:'center',
        flex: 1
    },
    header:{
        height: HEADER_H,
        width: HEADER_W,
        flexDirection:'row',
        alignItems:'center',
        padding: fifteen,
        borderBottomWidth:1,
        borderBottomColor: '#353535'

    },
   
})

export default MaxPlaylist