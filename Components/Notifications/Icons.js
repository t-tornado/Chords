import {
    Entypo,
    AntDesign,
    MaterialCommunityIcons,
    Fontisto
} from 'react-native-vector-icons'

export const PlayIcon = () => {
    return (
        <>
    <Entypo name='controller-play' size={15} color='black' />
        </>
    )
}

export const PauseIcon = () => {
    return (
        <>
        <AntDesign name='pause' size={20} color='black'  />
        </>
    )
}

export const StopIcon = () => {
    return (
        <>
    <Entypo name='controller-stop' size={20} color='red' />
        </>
    )
}

export const NextIcon = () => {
    return (
        <>
    <MaterialCommunityIcons name='skip-next' size={20} color='black' />
        </>
    )
}

export const PreviousIcon = () => {
    return (
        <>
    <MaterialCommunityIcons name='skip-previous' size={20} color='black' />
        </>
    )
}

export const SeekIcon = () => {
    return (
        <>
        <Fontisto name='forward' size={20} color='red' />
        </>
    )
}