import React, { useEffect } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import {connect} from 'react-redux'

import { getClassicals, getErrorLoadingClassicals, getLoadingClassicals } from '../../Redux/Selector/MainSelector'
import ListFooter from '../../Components/GeneralComponents/ListFooter'
import RenderSongs from '../../Components/GeneralComponents/RenderSongs'
import SongLoadingFailureScreen from '../ErrorScreens/SongLoadingFailureScreen'
import {songs} from '../../assets/audio_store'

import { width_numbers } from "../../Config/Dimensions";
import { fetchClassicals } from "../../Redux/Actions/ClassicalsActions";

const ClassicalsScreen = ({
  classicals, loadingClassicals, fetchClassicalFromStore
}) => {
  let { container, listBody } = styles;

  useEffect(() => {
    let cleanUp = true;
    if (cleanUp) {
      // fetchClassicalFromStore();
    }

    return () => (cleanUp = false);
  }, []);




  const onFetchSongs = React.useCallback(() => { });

  return (
    <View style={container}>
      <View style={listBody}>
        <FlatList
          data={classicals}
          ListEmptyComponent={() => (<SongLoadingFailureScreen />)}
          refreshControl={
            <RefreshControl
              refreshing={loadingClassicals}
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
    classicals: getClassicals(state.classicals), 
    loadingClassicals: getLoadingClassicals(state.classicals), 
    errorLoadingClassicalsState: getErrorLoadingClassicals(state.classicals)
  }
}

const mapDispatch = dispatch => {
  return {
    fetchClassicalFromStore: () => dispatch(fetchClassicals())
  }
}

export default connect(mapState,mapDispatch)(ClassicalsScreen)