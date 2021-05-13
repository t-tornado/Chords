import React, { useEffect } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import {connect} from 'react-redux'

import { getEasterAnthems, getErrorLoadingEasterAnthems, getLoadingEasterAnthems } from '../../Redux/Selector/MainSelector'
import ListFooter from '../../Components/GeneralComponents/ListFooter'
import RenderSongs from '../../Components/GeneralComponents/RenderSongs'
import SongLoadingFailureScreen from '../ErrorScreens/SongLoadingFailureScreen'
import {songs} from '../../assets/audio_store'

import { width_numbers } from "../../Config/Dimensions";
import { fetchEasterAnthems } from "../../Redux/Actions/EasterAnthemsActions";

const EasterAnthemsScreen = ({
  easterAnthems, loadingEasterAnthems, fetchEasterAnthemsFromStore
}) => {
  let { container, listBody } = styles;

  useEffect(() => {
    let cleanUp = true;
    if (cleanUp) {
      // fetchEasterAnthemsFromStore();
    }

    return () => (cleanUp = false);
  }, []);
  
  const onFetchSongs = React.useCallback(() => { });

  return (
    <View style={container}>
      <View style={listBody}>
        <FlatList
          data={easterAnthems}
          ListEmptyComponent={() => (<SongLoadingFailureScreen />)}
          refreshControl={
            <RefreshControl
              refreshing={loadingEasterAnthems}
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

const mapDispatch = dispatch => {
  return {
    fetchEasterAnthemsFromStore: () => dispatch(fetchEasterAnthems())
  }
}

export default connect(mapState,mapDispatch)(EasterAnthemsScreen)