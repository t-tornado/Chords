import React from "react";
import { StyleSheet, View } from "react-native";
import { app_backgroung_color } from "../../Config/Colors";
import {BottomTabContainer} from './BottomTab'



const AppHome = () => {
  let { container } = styles;

  React.useEffect(() => {
    let cleanUp = true;
    if (cleanUp) {
    }

    return () => (cleanUp = false);
  }, []);

  return (
    <View style={container}>
      <BottomTabContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: app_backgroung_color
  },
});

export default AppHome;
