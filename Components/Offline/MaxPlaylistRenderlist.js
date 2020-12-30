import React from 'react'
import {} from 'react-native'
import Card from '../PlaylistCard'

const RenderList = ({item, compareID}) => {
const [playing, setPlying] = React.useState(false)
React.useEffect(()=> {
    let clean = true
    if(clean && (item.id == compareID)){
        setPlying(true)
    }

    return ()=> clean = false
},[])

    return (
        <>
    
        </>
    )
}

export default RenderList