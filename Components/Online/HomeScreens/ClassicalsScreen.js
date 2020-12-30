import React, {  useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import {connect} from 'react-redux'
import {fetchclassicals} from '../../../Redux/actions/ClassicalsActions'
import {
  getClassicals, 
  getLoadingClassicals, 
  getErrorLoadingClassicals} from '../../../Redux/Selectors/PlaySelector'
import Footer from '../../FlatlistFooter'
import RenderClassicals from '../RenderItems/GeneralRenderItem' 
import ErrorScreen from '../ErrorScreens/GeneralErrorScreen'
import { fetchChristmasAnthems } from "../../../Redux/actions/ChristmasAnthemsActions";
import { fetchEasterAnthems } from "../../../Redux/actions/EasterAnthemsActions";
import {fetchAnthems} from '../../../Redux/actions/AnthemsActions'
import { fetchHymns } from '../../../Redux/actions/HymnActions'
import { fetchKelencha } from '../../../Redux/actions/KelenchaActions'

import { five } from "../../../Config/Dimensions";
import { fetchChoralBlues } from "../../../Redux/actions/ChoralBlues";


const ClassicalsScreen = ({ 
  fetchClassicalsFromStore, 
  classicals, 
  errorLoading, 
  fetchAnthemsFromStore,
  fetchChristmasAnthemsFromStore,
  fetchEasterAnthemsFromStore,
  fetchChoralBluesFromStore,
  fetchHymnsFromStore,
  fetchKelenchaFromStore,
  loadingClassicals}) => {
let { container, listBody} = styles;

 
useEffect(()=>{ 
let cleanUp = true
if(cleanUp){
fetchClassicalsFromStore()
}

return () => cleanUp = false
},[]) 

const onFetchSongs = React.useCallback(()=> {
  fetchClassicalsFromStore()
  fetchAnthemsFromStore()
  fetchChristmasAnthemsFromStore()
  fetchEasterAnthemsFromStore()
  fetchHymnsFromStore()
  fetchKelenchaFromStore()
  fetchChoralBluesFromStore()
})
    return (
    <View style={container}>      
   <View style={listBody} >
   
     <FlatList
      data={classicals}
      ListEmptyComponent={()=> <ErrorScreen 
        loadingError={errorLoading} 
        fetchClassicals={fetchClassicalsFromStore}
        fetchAnthems={fetchAnthemsFromStore}
        fetchChristmasAnthems={fetchChristmasAnthemsFromStore}
        fetchEasterAnthems={fetchEasterAnthemsFromStore}
        fetchHymns={fetchHymnsFromStore}
        fetchKelencha={fetchKelenchaFromStore}
        fetchChoralBlues={fetchChoralBluesFromStore}
        
        />}
      refreshControl={
        <RefreshControl
        refreshing={loadingClassicals}
          onRefresh={onFetchSongs}
        />
      }
      ListFooterComponent={()=> <Footer />}
      renderItem={({item})=><RenderClassicals item={item} />}
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
    flex:1
  },
  
});



const mapStateToProps = (state) => {
  return {
    classicals: getClassicals(state.classicals),
    loadingClassicals : getLoadingClassicals(state.classicals),
    errorLoading: getErrorLoadingClassicals(state.classicals)
  }
}

const mapDispatch = dispatch => {
  return {
    fetchClassicalsFromStore: () => dispatch(fetchclassicals()),
    fetchChristmasAnthemsFromStore: () => dispatch(fetchChristmasAnthems()),
    fetchEasterAnthemsFromStore: () => dispatch(fetchEasterAnthems()),
    fetchHymnsFromStore: () => dispatch(fetchHymns()),
    fetchKelenchaFromStore: () => dispatch(fetchKelencha()),
    fetchAnthemsFromStore: () => dispatch(fetchAnthems()),
    fetchChoralBluesFromStore: () => dispatch(fetchChoralBlues())
  }
}

export default connect(mapStateToProps,mapDispatch)(ClassicalsScreen);