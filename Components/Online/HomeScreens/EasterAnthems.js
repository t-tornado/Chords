import React, { useEffect } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { connect } from "react-redux";
import {
  getEasterAnthems,
  getLoadingEasterAnthems,
  getErrorLoadingEasterAnthems,
} from "../../../Redux/Selectors/PlaySelector";
import Footer from "../../FlatlistFooter";
import RenderEasterAnthems from "../RenderItems/GeneralRenderItem";
import ErrorScreen from "../ErrorScreens/GeneralErrorScreen";
import { five } from "../../../Config/Dimensions";
import { fetchEasterAnthems } from "../../../Redux/actions/EasterAnthemsActions";
import { fetchChristmasAnthems } from "../../../Redux/actions/ChristmasAnthemsActions";
import { fetchclassicals } from "../../../Redux/actions/ClassicalsActions";
import { fetchHymns } from "../../../Redux/actions/HymnActions";
import { fetchKelencha } from "../../../Redux/actions/KelenchaActions";
import { fetchAnthems } from "../../../Redux/actions/AnthemsActions";
import { fetchChoralBlues } from "../../../Redux/actions/ChoralBlues";

const EasterAnthemsScreen = ({
  fetchEasterAnthemsFromStore,
  easterAnthemsSongs,
  loadingEasterAnthems,
  fetchAnthemsFromStore,
  fetchHymnsFromStore,
  fetchChristmasAnthemsFromStore,
  fetchClassicalsFromStore,
  fetchChoralBluesFromStore,
  fetchKelenchaFromStore,
  errorLoadingEasterAnthems,
}) => {
  let { container, listBody } = styles;

  useEffect(() => {
    let cleanUp = true;
    if (cleanUp) {
      fetchEasterAnthemsFromStore();
    }

    return () => (cleanUp = false);
  }, []);

  const onFetchSongs = React.useCallback(() => {
    fetchEasterAnthemsFromStore();
    fetchChristmasAnthemsFromStore();
    fetchHymnsFromStore();
    fetchAnthemsFromStore();
    fetchChoralBluesFromStore();
    fetchClassicalsFromStore();
    fetchKelenchaFromStore();
  });
  return (
    <View style={container}>
      <View style={listBody}>
        <FlatList
          data={easterAnthemsSongs}
          // data={Songs}
          ListEmptyComponent={() => (
            <ErrorScreen
              loadingError={errorLoadingEasterAnthems}
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
              refreshing={loadingEasterAnthems}
              onRefresh={onFetchSongs}
            />
          }
          ListFooterComponent={() => <Footer />}
          renderItem={({ item }) => <RenderEasterAnthems item={item} />}
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
    easterAnthemsSongs: getEasterAnthems(state.easterAnthems),
    loadingEasterAnthems: getLoadingEasterAnthems(state.easterAnthems),
    errorLoadingEasterAnthems: getErrorLoadingEasterAnthems(
      state.easterAnthems
    ),
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchEasterAnthemsFromStore: () => dispatch(fetchEasterAnthems()),
    fetchChristmasAnthemsFromStore: () => dispatch(fetchChristmasAnthems()),
    fetchHymnsFromStore: () => dispatch(fetchHymns()),
    fetchAnthemsFromStore: () => dispatch(fetchAnthems()),
    fetchKelenchaFromStore: () => dispatch(fetchKelencha()),
    fetchClassicalsFromStore: () => dispatch(fetchclassicals()),
    fetchChoralBluesFromStore: () => dispatch(fetchChoralBlues()),
  };
};

export default connect(mapStateToProps, mapDispatch)(EasterAnthemsScreen);
