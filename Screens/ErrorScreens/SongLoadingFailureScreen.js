import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { width_numbers } from "../../Config/Dimensions";
import { error_screen_colors } from "../../Config/Colors";

const { height, width } = Dimensions.get("window");
const MODAL_MESSAGE_WIDTH = width * 0.35;
const MODAL_MESSAGE_HEIGHT = height * 0.045;
const MODAL_HEIGHT = height * 0.2;
const MODAL_WIDTH = width;


const SongLodingFailureScreen = ({
  fetchAnthems,
  loadingError,
  fetchChristmasAnthems,
  fetchHymns,
  fetchKelencha,
  fetchEasterAnthems,
  fetchClassicals,
  fetchChoralBlues,
}) => {
  let { errorContainer, text, modal } = styles;

/**
 * Passing all functions as argz is verbose. Create a generic function and pass only loading error
 * as argz to the error screen. Call method if loading error is true
 */

  const onFetchAnthems = React.useCallback(() => {
    // fetchAnthems();
    // fetchChristmasAnthems();
    // fetchClassicals();
    // fetchHymns();
    // fetchKelencha();
    // fetchEasterAnthems();
    // fetchChoralBlues();
    console.log('From ErrorScreen, Error button tapped')
  });
  // if(loadingError) {
    return (
      <View style={modal}>
        <Text style={text}>Could not connect </Text>
        <TouchableOpacity style={errorContainer} onPress={onFetchAnthems}>
          <Text style={text}>Try again</Text>
          {/* <Feather name="wifi-off" size={width_numbers[13]} color="#ffffff90" /> */}
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

export default SongLodingFailureScreen;
