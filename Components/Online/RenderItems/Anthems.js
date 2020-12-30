import React from 'react'
import CardWithDownload from '../CardWithDownload'
import CardDownloaded from '../CardDownloaded'
import {useDownloadedSongs} from '../../../Context/TarckContext'

const RenderList = ({item}) => {
    const [dd,setDd] = React.useState()
    const downloadedSongs = useDownloadedSongs()
   
    React.useEffect(()=>{
      let cleanUp= true
      downloadedSongs.forEach(song => {
        if(song.title == item.title) {
  if(cleanUp){
    setDd(true)
  }
        }
      })
    return () => cleanUp = false
    },[downloadedSongs])
    
    return (
      <>
      {
        dd 
        ? <CardDownloaded 
        key={item.id} 
        title={item.title} 
        artist={item.artist} 
        composer={item.description} 
        numDownloads={item.downloads} 
        id={item.id} 
        artwork={item.artwork}
        likes={item.likes}
        />
        :  <CardWithDownload 
        artist={item.artist}  
        title={item.title} 
        id={item.id} 
        composer={item.description} 
        key={item.id} 
        url={item.url} 
        numDownloads={item.downloads} 
        collection={'anthems'}
        artwork={item.artwork}
        likes={item.likes}
        duration={item.duration}
        genre={item.genre}
        />
      }
      </>
    )
      }

export default RenderList 