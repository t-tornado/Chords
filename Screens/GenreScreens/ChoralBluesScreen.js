import React, { useEffect } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import {connect} from 'react-redux'

import ListFooter from '../../Components/GeneralComponents/ListFooter'
import RenderSongs from '../../Components/GeneralComponents/RenderSongs'
import SongLoadingFailureScreen from '../ErrorScreens/SongLoadingFailureScreen'
import {getChoralBlues, getErrorLoadingChoralBlues, getLoadingChoralBlues} from '../../Redux/Selector/MainSelector'
import {songs} from '../../assets/audio_store'

import { width_numbers } from "../../Config/Dimensions";

const ChoralBleusScreen = ({
  choralBlues, loadingChoralBlues, errorLoadingChoralBluesState
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
          data={[]}
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
    choralBlues: getChoralBlues(state.choralBlues), 
    loadingChoralBlues: getLoadingChoralBlues(state.choralBlues), 
    errorLoadingChoralBluesState: getErrorLoadingChoralBlues(state.choralBlues)
  }
}

export default connect(mapState)(ChoralBleusScreen)