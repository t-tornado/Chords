import React from 'react'
import {Text} from 'react-native'
import {useTrackPlayerProgress} from 'react-native-track-player'
import { eleven, five, thirteen } from '../../Config/Dimensions'


const Duration = () => {
    const progress = useTrackPlayerProgress(1000)
    const [tim, setTim] = React.useState(0)
  function Timer(pos) { 
    return pos > 3600 ?  
    [
      parseInt(pos / 60 / 60 % 60),
      parseInt(pos / 60 % 60),
      parseInt(pos % 60)
    ].join(':').replace(/\b(\d)\b/g, "0$1") : 
    [
      parseInt(pos / 60 % 60),
      parseInt(pos % 60)
    ].join(':').replace(/\b(\d)\b/g, "0$1")
  }
  const Time = Timer(progress.duration)
  React.useEffect(()=> {
    let cleanUp = true
    if(cleanUp){
      setTim(Time)
    }
      return () => {
        cleanUp = false
      }
    },[progress])
  
    return (
      <>
      <Text
      style={{
        padding: five,
        color: "#5488d1" , 
        fontSize: eleven
      }}
      >{tim}</Text>
      </>
    )
  }

  export default Duration