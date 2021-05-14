import React, { useEffect } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import {connect} from 'react-redux'

import { getChristmasAnthems, getErrorLoadingChristmasAnthems, getLoadingChristmasAnthems } from '../../Redux/Selector/MainSelector'
import ListFooter from '../../Components/GeneralComponents/ListFooter'
import RenderSongs from '../../Components/GeneralComponents/RenderSongs'
import SongLoadingFailureScreen from '../ErrorScreens/SongLoadingFailureScreen'
import {songs} from '../../assets/audio_store'

import { width_numbers } from "../../Config/Dimensions";
import { fetchChristmasAnthems } from "../../Redux/Actions/ChristmasAnthemsActions";

const ChristmasAnthemsScreen = ({ 
  christmasAnthems, loadingChristmasAnthems, fetchChristmasAnthemsFromStore,errorLoadingchristmasAnthems
}) => {
  let { container, listBody } = styles;

  useEffect(() => {
    let cleanUp = true;
    if (cleanUp) {
      fetchChristmasAnthemsFromStore()
    }

    return () => (cleanUp = false);
  }, []);

 

  const onFetchSongs = React.useCallback(() => { });

  return (
    <View style={container}>
      <View style={listBody}>
        <FlatList
          data={christmasAnthems}
          ListEmptyComponent={() => (<SongLoadingFailureScreen loadingError={errorLoadingchristmasAnthems} />)}
          refreshControl={
            <RefreshControl
              refreshing={loadingChristmasAnthems}
              onRefresh={onFetchSongs}
            />
          }
          ListFooterComponent={() => <ListFooter />}
          renderItem={({ item }) => <RenderSongs item={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: width_numbers[5],
  },
  listBody: {
    flex: 1,
  },
});

const mapState = state => {
  return {
    christmasAnthems: getChristmasAnthems(state.christmasAnthems), 
    loadingChristmasAnthems: getLoadingChristmasAnthems(state.christmasAnthems), 
    errorLoadingchristmasAnthems: getErrorLoadingChristmasAnthems(state.christmasAnthems)
  }
}

const mapDispatch = dispatch => {
  return {
    fetchChristmasAnthemsFromStore: () => dispatch(fetchChristmasAnthems())
  }
}

export default connect(mapState, mapDispatch)(ChristmasAnthemsScreen)