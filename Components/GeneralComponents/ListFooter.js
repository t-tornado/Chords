import React from "react";
import { StyleSheet, View, Dimensions, StatusBar } from "react-native";

const { height, width } = Dimensions.get("window");
const FOOTER_HEIGHT = height * 0.18;

const ListFooter = () => {
  let { footer } = styles;

  return <View style={footer} />;
};

const styles = StyleSheet.create({
  footer: {
    width: width,
    height: FOOTER_HEIGHT,
  },
});

export default React.memo(ListFooter);
