import React, {  useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import {connect} from 'react-redux'
import {fetchKelencha} from '../../../Redux/actions/KelenchaActions'
import {
  getKelencha, 
  getLoadingKelencha, 
  getErrorLoadingKelencha} from '../../../Redux/Selectors/PlaySelector'
import Footer from '../../FlatlistFooter'
import RenderKelencha from '../RenderItems/GeneralRenderItem'
import ErrorScreen from '../ErrorScreens/GeneralErrorScreen'
import { fetchChristmasAnthems } from "../../../Redux/actions/ChristmasAnthemsActions";
import { fetchEasterAnthems } from "../../../Redux/actions/EasterAnthemsActions";
import {fetchAnthems} from '../../../Redux/actions/AnthemsActions'
import {fetchclassicals} from '../../../Redux/actions/ClassicalsActions'
import { fetchHymns } from '../../../Redux/actions/HymnActions'
import { five } from "../../../Config/Dimensions";
import { fetchChoralBlues } from "../../../Redux/actions/ChoralBlues";

 
const KelenchaScreen = ({
  fetchKelenchaFromStore, 
  kelencha,
  loadingKelencha, 
  fetchAnthemsFromStore,
  fetchHymnsFromStore,
  fetchClassicalsFromStore,
  fetchChristmasAnthemsFromStore,
  fetchEasterAnthemsFromStore,
  fetchChoralBluesFromStore,
  loadingError}) => {
  
  let { container,listBody } = styles;


  useEffect(()=> {
    let cleanUp = true
  if(cleanUp){
    fetchKelenchaFromStore()
  }
    return () => cleanUp = false
  },[])
  
  const onFetchKelencha = React.useCallback(()=> {
    fetchKelenchaFromStore()
    fetchAnthemsFromStore()
    fetchChristmasAnthemsFromStore()
    fetchEasterAnthemsFromStore()
    fetchHymnsFromStore()
    fetchClassicalsFromStore()
    fetchChoralBluesFromStore()
  })
   
 
  return (
    <View style={container}>      
   <View style={listBody} >
    <FlatList
     data={kelencha}
     ListEmptyComponent={()=> <ErrorScreen 
      loadingError={loadingError} 
      fetchKelencha={fetchKelenchaFromStore}
      fetchAnthems={fetchAnthemsFromStore}
      fetchChristmasAnthems={fetchChristmasAnthemsFromStore}
      fetchClassicals={fetchClassicalsFromStore}
      fetchEasterAnthems={fetchEasterAnthemsFromStore}
      fetchHymns={fetchHymnsFromStore}
      fetchChoralBlues={fetchChoralBluesFromStore}
      />}
     refreshControl={
       <RefreshControl
       refreshing={loadingKelencha}
       onRefresh={onFetchKelencha}
       />
     }
     ListFooterComponent={()=> <Footer />}
     renderItem={({item})=> <RenderKelencha item={item} />}
     />
    </View>
  </View>
  )
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
    kelencha: getKelencha(state.kelencha),
    loadingKelencha: getLoadingKelencha(state.kelencha),
    loadingError: getErrorLoadingKelencha(state.kelencha)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchKelenchaFromStore: () => dispatch(fetchKelencha()),
    fetchClassicalsFromStore: () => dispatch(fetchclassicals()),
    fetchChristmasAnthemsFromStore: () => dispatch(fetchChristmasAnthems()),
    fetchEasterAnthemsFromStore: () => dispatch(fetchEasterAnthems()),
    fetchHymnsFromStore: () => dispatch(fetchHymns()),
    fetchAnthemsFromStore: () => dispatch(fetchAnthems()),
    fetchChoralBluesFromStore: () => dispatch(fetchChoralBlues())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KelenchaScreen);