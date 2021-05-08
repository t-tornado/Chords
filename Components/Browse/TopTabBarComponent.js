import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
} from "react-native";
import { browse_top_scrollbar_colors } from '../../Config/Colors'
import {width_numbers } from "../../Config/Dimensions";


const { height, width } = Dimensions.get("window");
const SCREEN_MARIN_TOP = StatusBar.currentHeight * 1.45;

const BrowseTopTabBarComponent = (props) => {
  const scrollViewRef = React.useRef(null);
  const routes = props.navigation.state.routes;
  const activeIndex = props.navigation.state.index;
  React.useEffect(() => {
    scrollViewRef.current.scrollTo({
      x: activeIndex * width_numbers[95],
      y: 0,
      animated: true,
    });
  }, [activeIndex]);
  return (
    <View style={styles.container}>
      <ScrollView ref={(list) => (scrollViewRef.current = list)} horizontal>
        {routes.map((route, index) => {
          const label = route.params.title;
          const isFocused = props.navigation.state.index === index;
          const onPress = () => {
            props.navigation.navigate(route.routeName);
          };
          let focusStyle = {};
          let fontColor = {};
          isFocused
            ? (focusStyle = { backgroundColor: browse_top_scrollbar_colors.active_tab })
            : (focusStyle = { backgroundColor: browse_top_scrollbar_colors.non_active_tab });
          isFocused
            ? (fontColor = { color: browse_top_scrollbar_colors.active_text })
            : (fontColor = { color: browse_top_scrollbar_colors.non_active_text });

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={[styles.tabItem, focusStyle]}
              activeOpacity={1}
            >
              <Text style={[styles.labelStyle, fontColor]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: SCREEN_MARIN_TOP,
    backgroundColor: "transparent",
  },
  tabItem: {
    marginHorizontal: width_numbers[7],
    padding: width_numbers[7],
    borderRadius: (width * 0.25) / 3,
    borderWidth: 3,
    borderColor: browse_top_scrollbar_colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  labelStyle: {
    color: "black",
    fontSize: width_numbers[13],
  },
});

export default BrowseTopTabBarComponent;
