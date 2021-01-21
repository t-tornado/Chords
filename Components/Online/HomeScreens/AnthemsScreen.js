import React, { useEffect } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { connect } from "react-redux";
import {
  getAnthems,
  getLoadingAnthems,
  getErrorLoadingAnthems,
} from "../../../Redux/Selectors/PlaySelector";
import { fetchAnthems } from "../../../Redux/actions/AnthemsActions";
import Footer from "../../FlatlistFooter";
import RenderAnthems from "../RenderItems/GeneralRenderItem";
import ErrorScreen from "../ErrorScreens/GeneralErrorScreen";
import { fetchChristmasAnthems } from "../../../Redux/actions/ChristmasAnthemsActions";
import { fetchChoralBlues } from "../../../Redux/actions/ChoralBlues";
import { fetchEasterAnthems } from "../../../Redux/actions/EasterAnthemsActions";
import { fetchclassicals } from "../../../Redux/actions/ClassicalsActions";
import { fetchHymns } from "../../../Redux/actions/HymnActions";
import { fetchKelencha } from "../../../Redux/actions/KelenchaActions";

import { five } from "../../../Config/Dimensions";

const AnthemsScreen = ({
  fetchChristmasAnthemsFromStore,
  fetchEasterAnthemsFromStore,
  fetchHymnsFromStore,
  fetchClassicalsFromStore,
  fetchKelenchaFromStore,
  fetchAnthemsFromStore,
  fetchChoralBluesFromStore,
  anthemsSongs,
  loadingAnthems,
  errorLoading,
}) => {
  let { container, listBody } = styles;

  useEffect(() => {
    let cleanUp = true;
    if (cleanUp) {
      fetchAnthemsFromStore();
    }

    return () => (cleanUp = false);
  }, []);

  const onFetchSongs = React.useCallback(() => {
    fetchAnthemsFromStore();
    fetchChristmasAnthemsFromStore();
    fetchEasterAnthemsFromStore();
    fetchHymnsFromStore();
    fetchClassicalsFromStore();
    fetchKelenchaFromStore();
    fetchChoralBluesFromStore();
  });
  return (
    <View style={container}>
      <View style={listBody}>
        <FlatList
          data={anthemsSongs}
          ListEmptyComponent={() => (
            <ErrorScreen
              loadingError={errorLoading}
              fetchAnthems={fetchAnthemsFromStore}
              fetchChristmasAnthems={fetchChristmasAnthemsFromStore}
              fetchClassicals={fetchClassicalsFromStore}
              fetchEasterAnthems={fetchEasterAnthemsFromStore}
              fetchHymns={fetchHymnsFromStore}
              fetchKelencha={fetchKelenchaFromStore}
              fetchChoralBlues={fetchChoralBluesFromStore}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={loadingAnthems}
              onRefresh={onFetchSongs}
            />
          }
          ListFooterComponent={() => <Footer />}
          renderItem={({ item }) => <RenderAnthems item={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: five,
  },
  listBody: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    anthemsSongs: getAnthems(state.anthems),
    loadingAnthems: getLoadingAnthems(state.anthems),
    errorLoading: getErrorLoadingAnthems(state.anthems),
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchChristmasAnthemsFromStore: () => dispatch(fetchChristmasAnthems()),
    fetchEasterAnthemsFromStore: () => dispatch(fetchEasterAnthems()),
    fetchHymnsFromStore: () => dispatch(fetchHymns()),
    fetchClassicalsFromStore: () => dispatch(fetchclassicals()),
    fetchKelenchaFromStore: () => dispatch(fetchKelencha()),
    fetchAnthemsFromStore: () => dispatch(fetchAnthems()),
    fetchChoralBluesFromStore: () => dispatch(fetchChoralBlues()),
  };
};

export default connect(mapStateToProps, mapDispatch)(AnthemsScreen);
