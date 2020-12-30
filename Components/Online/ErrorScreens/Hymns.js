import React from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native'
import { Colors } from '../../../assets/colors';
import { seven, thirteen} from '../../../Config/Dimensions'
import {
  Feather
} from 'react-native-vector-icons'
 
const { height, width } = Dimensions.get("window");
const MODAL_MESSAGE_WIDTH = width * 0.35
const MODAL_MESSAGE_HEIGHT = height * 0.045
const MODAL_HEIGHT = height * 0.2 
const MODAL_WIDTH = width 


const HymnErrorScreen = ({
  fetchSongs,
  loadingError,
  fetchAnthems,
  fetchChristmasAnthems,
  fetchKelencha, 
  fetchChoralBlues,
  fetchEasterAnthems,
  fetchClassicals,
}) => {
    let {errorContainer, textt, modal} = styles
    const onFetchSongs = ()=>{
      fetchSongs()
      fetchChristmasAnthems()
      fetchAnthems()
      fetchClassicals()
      fetchKelencha()
      fetchEasterAnthems() 
      fetchChoralBlues()
    }
    if(!loadingError) {
     return <View />
    } else if(loadingError) {
      return (
        <View style={modal}>
        <Text style={textt} >Error Loading Hymns</Text>
      <TouchableOpacity style={errorContainer} onPress={onFetchSongs} >
      <Text style={textt} >Try again</Text>
      <Feather name='wifi-off' size={thirteen} color='#ffffff90' />
      </TouchableOpacity>
      </View>
      )
    }
    }

const styles = StyleSheet.create({
    errorContainer: {
        width: MODAL_MESSAGE_WIDTH,
        height: MODAL_MESSAGE_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.active_top_tab,
        borderRadius: MODAL_WIDTH / 3,
        marginVertical: MODAL_MESSAGE_HEIGHT,
        flexDirection: 'row'
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: MODAL_HEIGHT,
        width: MODAL_WIDTH,
        marginTop: MODAL_HEIGHT,
    },
    textt: {
        color: Colors.active_top_tab_text,
        fontSize: thirteen,
        paddingHorizontal: seven
    }
})


export default HymnErrorScreen