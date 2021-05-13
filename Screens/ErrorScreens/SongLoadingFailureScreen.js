import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import {connect} from 'react-redux'
import { width_numbers } from "../../Config/Dimensions";
import { error_screen_colors } from "../../Config/Colors";
import Feather from 'react-native-vector-icons/Feather'

/**
 * Reloading Songs actions from backend 
 */
import {fetchAnthems} from '../../Redux/Actions/AnthemsActions'
import {fetchChoralBlues} from '../../Redux/Actions/ChoralBlues'
import {fetchChristmasAnthems} from '../../Redux/Actions/ChristmasAnthemsActions'
import {fetchClassicals} from '../../Redux/Actions/ClassicalsActions'
import {fetchEasterAnthems} from '../../Redux/Actions/EasterAnthemsActions'
import {fetchHymns} from '../../Redux/Actions/HymnActions'
import {fetchKelencha} from '../../Redux/Actions/KelenchaActions'




const { height, width } = Dimensions.get("window");
const MODAL_MESSAGE_WIDTH = width * 0.35;
const MODAL_MESSAGE_HEIGHT = height * 0.045;
const MODAL_HEIGHT = height * 0.2;
const MODAL_WIDTH = width; 



const SongLodingFailureScreen = ({
  fetchStoreAnthems
}) => {
  let { errorContainer, text, modal } = styles;


  const reloadSongss = React.useCallback(() => {
    fetchStoreAnthems()
    // console.log('INFO FROM SONGS LOADING FAILURE SCREEN >>>> Error button tapped')
  });
  // if(loadingError) {
    return (
      <View style={modal}>
        <Text style={text}>Could not connect </Text>
        <TouchableOpacity style={errorContainer} onPress={reloadSongss}>
          <Text style={text}>Try again</Text>
          <Feather name="wifi-off" size={width_numbers[13]} color="#ffffff90" />
        </TouchableOpacity>
      </View>
    );
  // }
};

const styles = StyleSheet.create({
  errorContainer: {
    width: MODAL_MESSAGE_WIDTH,
    height: MODAL_MESSAGE_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: error_screen_colors.text_box_color,
    borderRadius: MODAL_WIDTH / 3,
    marginVertical: MODAL_MESSAGE_HEIGHT,
    flexDirection: "row",
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    height: MODAL_HEIGHT,
    width: MODAL_WIDTH,
    marginTop: MODAL_HEIGHT,
  },
  text: {
    color: error_screen_colors.text_color,
    fontSize: width_numbers[13],
    paddingHorizontal: width_numbers[7],
  },
});

const mapDispatch = dispatch => {
  return{ 
    fetchStoreAnthems: () => dispatch(fetchAnthems()), 
    
  }
}

export default connect(null, mapDispatch)(SongLodingFailureScreen);