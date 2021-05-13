import React, { useEffect } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import {connect} from 'react-redux'

import { getEasterAnthems, getErrorLoadingEasterAnthems, getLoadingEasterAnthems } from '../../Redux/Selector/MainSelector'
import ListFooter from '../../Components/GeneralComponents/ListFooter'
import RenderSongs from '../../Components/GeneralComponents/RenderSongs'
import SongLoadingFailureScreen from '../ErrorScreens/SongLoadingFailureScreen'
import {songs} from '../../assets/audio_store'

import { width_numbers } from "../../Config/Dimensions";

const EasterAnthemsScreen = ({
  easterAnthems, loadingEasterAnthems, errorLoadingEasterAnthemsState
}) => {
  let { container, listBody } = styles;

  useEffect(() => {
    let cleanUp = true;
    if (cleanUp) {
      // fetchAnthemsFromStore();
    }

    return () => (cleanUp = false);
  }, []);
  
  const onFetchSongs = React.useCallback(() => { });

  return (
    <View style={container}>
      <View style={listBody}>
        <FlatList
          data={songs}
          ListEmptyComponent={() => (<SongLoadingFailureScreen />)}
          refreshControl={
            <RefreshControl
              // refreshing={loadingAnthems}
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
    easterAnthems: getEasterAnthems(state.easterAnthems), 
    loadingEasterAnthems: getLoadingEasterAnthems(state.easterAnthems), 
    errorLoadingEasterAnthemsState: getErrorLoadingEasterAnthems(state.easterAnthems)
  }
}

export default connect(mapState)(EasterAnthemsScreen)