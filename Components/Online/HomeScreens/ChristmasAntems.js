import React, {  useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import {connect} from 'react-redux'
import { 
    getChristmasAnthems,  
    getErrorLoadingChristmasAnthems, 
    getLoadingChristmasAnthems,
 } from '../../../Redux/Selectors/PlaySelector'
import Footer from '../../FlatlistFooter'
import RenderChristmasAnthems from '../RenderItems/GeneralRenderItem'
import ErrorScreen from '../ErrorScreens/GeneralErrorScreen'
import { five } from "../../../Config/Dimensions";
import { fetchChristmasAnthems } from "../../../Redux/actions/ChristmasAnthemsActions";
import { fetchEasterAnthems } from "../../../Redux/actions/EasterAnthemsActions";
import { fetchclassicals } from '../../../Redux/actions/ClassicalsActions'
import { fetchHymns } from '../../../Redux/actions/HymnActions'
import { fetchKelencha } from '../../../Redux/actions/KelenchaActions'
import { fetchAnthems} from '../../../Redux/actions/AnthemsActions'
import { fetchChoralBlues } from "../../../Redux/actions/ChoralBlues";
 

 
const ChristmasAnthemsScreen = ({
    fetchChristmasAnthemsFromStore,
    christmasAnthemsSongs,
    loadingChristmsAnthems, 
    fetchEasterAnthemsFromStore,
    fetchChoralBluesFromStore,
    fetchClassicalsFromStore,
    fetchHymnsFromStore,
    fetchAnthemsFromStore,
    fetchKelenchaFromStore,
    errorloadingChristmsAnthems}) => {
  let { container,listBody } = styles;

useEffect(()=> {
let cleanUp = true
if(cleanUp) {
fetchChristmasAnthemsFromStore()
}

return () =>   cleanUp = false

},[])

const onFetchSongs = React.useCallback(()=> {
  fetchChristmasAnthemsFromStore()
  fetchEasterAnthemsFromStore()
  fetchHymnsFromStore()
  fetchClassicalsFromStore()
  fetchKelenchaFromStore()
  fetchAnthemsFromStore()
  fetchChoralBluesFromStore()
})
  return (
    <View style={container}>   
     <View style={listBody} >
    <FlatList
     data={christmasAnthemsSongs}
     ListEmptyComponent={()=> <ErrorScreen
      loadingError={errorloadingChristmsAnthems} 
      fetchAnthems={fetchAnthemsFromStore}
      fetchChristmasAnthems={fetchChristmasAnthemsFromStore}
      fetchClassicals={fetchChristmasAnthemsFromStore}
      fetchEasterAnthems={fetchEasterAnthemsFromStore}
      fetchHymns={fetchHymnsFromStore}
      fetchKelencha={fetchKelenchaFromStore}
      fetchChoralBlues={fetchChoralBluesFromStore}
      />}
     refreshControl={
       <RefreshControl
       refreshing={loadingChristmsAnthems}
         onRefresh={onFetchSongs}
       />
     }
     ListFooterComponent={()=> <Footer /> }
     renderItem={({item})=> <RenderChristmasAnthems item={item} />
     }
     /> 
    </View>
    </View>
  );
     }

 
const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: five,
  },
  listBody: {
    flex:1
  },
}); 

 


const mapStateToProps = (state) => {
  return {
    christmasAnthemsSongs: getChristmasAnthems(state.christmasAnthems),
    loadingChristmsAnthems: getLoadingChristmasAnthems(state.christmasAnthems),
    errorloadingChristmsAnthems: getErrorLoadingChristmasAnthems(state.christmasAnthems)
  }
}

const mapDispatch = dispatch => {
  return {
    fetchChristmasAnthemsFromStore: () => dispatch(fetchChristmasAnthems()),
    fetchEasterAnthemsFromStore: () => dispatch(fetchEasterAnthems()),
    fetchHymnsFromStore: () => dispatch(fetchHymns()),
    fetchClassicalsFromStore: () => dispatch(fetchclassicals()),
    fetchKelenchaFromStore: () => dispatch(fetchKelencha()),
    fetchAnthemsFromStore: () => dispatch(fetchAnthems()),
    fetchChoralBluesFromStore: () => dispatch(fetchChoralBlues())
  }
}

export default connect(mapStateToProps, mapDispatch)(ChristmasAnthemsScreen);  