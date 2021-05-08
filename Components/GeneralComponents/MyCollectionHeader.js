import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { width_numbers } from "../../Config/Dimensions";

const { height, width } = Dimensions.get("window");
const HEADER_H = height * 0.05;
const HEADER_W = width;

const MyCollectionHeader = () => {
  let { headerBar, headerCover } = styles;

  return (
    <View style={headerBar}>
      <View style={headerCover}>
        <Text style={{ color: '#ffffff', fontSize: width_numbers[25] }}>
          {" "}
          Library
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBar: {
    height: HEADER_H,
    width: HEADER_W,
    backgroundColor: "transparent",
    marginBottom: HEADER_H * 0.35,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  headerCover: {
    height: HEADER_H,
    width: width * 0.4,
    backgroundColor: "#353535",
    borderRadius: width * 0.07,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyCollectionHeader;
