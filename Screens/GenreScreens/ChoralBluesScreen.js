import React, { useEffect } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import {connect} from 'react-redux'

import ListFooter from '../../Components/GeneralComponents/ListFooter'
import RenderSongs from '../../Components/GeneralComponents/RenderSongs'
import SongLoadingFailureScreen from '../ErrorScreens/SongLoadingFailureScreen'
import {getChoralBlues, getErrorLoadingChoralBlues, getLoadingChoralBlues} from '../../Redux/Selector/MainSelector'
import {songs} from '../../assets/audio_store'

import { width_numbers } from "../../Config/Dimensions";
import { fetchChoralBlues } from "../../Redux/Actions/ChoralBlues";

const ChoralBleusScreen = ({
  choralBlues, loadingChoralBlues, fetchChoralBluesFromStore, errorLoadingChoralBluesState
}) => {
  let { container, listBody } = styles;

  useEffect(() => {
    let cleanUp = true;
    if (cleanUp) {
      fetchChoralBluesFromStore()
    }

    return () => (cleanUp = false);
  }, []);


const onFetchSongs = React.useCallback(() => { });

  return (
    <View style={container}>
      <View style={listBody}>
        <FlatList
          data={choralBlues}
          ListEmptyComponent={() => (<SongLoadingFailureScreen loadingError={errorLoadingChoralBluesState} />)}
          refreshControl={
            <RefreshControl
              refreshing={loadingChoralBlues}
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
    choralBlues: getChoralBlues(state.choralBlues), 
    loadingChoralBlues: getLoadingChoralBlues(state.choralBlues), 
    errorLoadingChoralBluesState: getErrorLoadingChoralBlues(state.choralBlues)
  }
}

const mapDispatch = dispatch => {
  return {
    fetchChoralBluesFromStore: () => dispatch(fetchChoralBlues())
  }
}

export default connect(mapState, mapDispatch)(ChoralBleusScreen)