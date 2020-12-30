import React from 'react'
import {Modal,StyleSheet,View,Text,Dimensions, TouchableOpacity, Image} from 'react-native'
import { Colors } from '../../assets/colors'
import { fifteen, five, fourteen, seven, seventeen, ten, twelve, twenty } from '../../Config/Dimensions'
import {
    MaterialCommunityIcons,
    MaterialIcons,
    AntDesign

} from 'react-native-vector-icons'
import { 
    useCloseDelete, 
    useFileToDelete, 
    useOpenDeleteState,
    useLikeSong,
    useDeleteSong
} from '../../Context/TarckContext'

const {height, width} = Dimensions.get('window')
const MODAL_HEIGHT = height * 0.45;
const MODAL_WIDTH = width * 0.95;
const OPTION_HEADER_IMAGE_H = MODAL_HEIGHT * 0.185
const OPTION_HEADER_IMAGE_w = MODAL_HEIGHT * 0.185

const OnlineOptions = () => {
    const [modal,setModal] = React.useState(false)
    const [title, setTitle]= React.useState(null)
    const [choir, setChoir]= React.useState(null)
    const [composer, setComposer] = React.useState(null)
    const [id, setId] = React.useState(null)
    const [genre, setGenre] = React.useState(null)
    const openDeleteState = useOpenDeleteState()
    const closeDeleteAction = useCloseDelete()
    const fileToDelete = useFileToDelete()
    const likeSong = useLikeSong()
    const deleteSong = useDeleteSong()


React.useEffect(()=> {
let clean = true
    if(clean && openDeleteState) {
setModal(true)
setTitle(fileToDelete.title == null ? 'Title' : fileToDelete.title )
setChoir(fileToDelete.artist == null ? 'Choir' : fileToDelete.artist )
setComposer(fileToDelete.copmoser == null ? 'Composer' : fileToDelete.copmoser )
setId(fileToDelete.id)
setGenre(fileToDelete.genre)
    }
    return () => clean = false

},[openDeleteState])

const closeModal = () => {
    setModal(false)
    closeDeleteAction()
}

const deleteAction = () => {
    setModal(false)
    deleteSong()
    closeDeleteAction()
}

const likeAction = () => {
    likeSong(false,genre,id)
    setModal(false)
    closeDeleteAction()

}

    return (
        <Modal 
        style={styles.container}
        visible={modal}
        transparent={true}
        animationType='slide'
        >
        <View style={styles.cover}>
            <View style={styles.header} >
                <View style={styles.header_image} >
                    <Image 
                    source={require('../../assets/alternate_image.jpg')}
                    style={styles.header_image}
                    />
                </View>
                <View style={styles.header_details} >
                    <Text style={{
                        color:Colors.download_card_title,
                        fontSize:fourteen
                    }} 
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    >{title}</Text>
                    <Text
                    style={{
                        color: Colors.download_card_composer,
                        fontSize: ten                        
                    }}
                    >{composer}</Text>
                    <Text 
                    style={{
                        color: Colors.download_card_choir,
                        fontSize: twelve
                    }}
                    >{choir}</Text>
                </View>
            </View>
            <View style={styles.body} >
            <TouchableOpacity style={styles.option_bar} activeOpacity={0.85} onPress={likeAction}  >
                    <AntDesign name='heart' size={twenty} color={Colors.bottom_tab_active_icon} style={{paddingHorizontal: ten}} />
                    <Text style={styles.option_text} >Like song</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option_bar} activeOpacity={0.85} onPress={deleteAction} >
                    <MaterialIcons name='delete' size={twenty} color={Colors.to_delete_delete_icon} style={{paddingHorizontal: ten}} />
                    <Text style={styles.option_text} >Remove From offline List</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option_bar} activeOpacity={0.85} onPress={closeModal} >
                    <MaterialCommunityIcons name='cancel' size={twenty} color={Colors.bottom_tab_active_icon} style={{paddingHorizontal: ten}}/>
                    <Text style={styles.option_text} >CANCEL</Text>
                </TouchableOpacity>
            </View>
            <View></View>
        </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    body: {
        height: MODAL_HEIGHT * 0.7,
        width: MODAL_WIDTH,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
            height: MODAL_HEIGHT,
            width: MODAL_WIDTH,
            position: 'absolute',
            left: 0,
            right: 0,
            
    },
    cover: {
        height: MODAL_HEIGHT,
        width: MODAL_WIDTH,
        backgroundColor: Colors.to_delete_background,
        marginTop: height -MODAL_HEIGHT,
        borderTopLeftRadius:fifteen,
        borderTopRightRadius: fifteen,
        alignSelf: 'center',

    },
    header: {
        height: MODAL_HEIGHT * 0.18,
        width: MODAL_WIDTH,
        padding: fifteen,
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    header_details: {
        width: MODAL_WIDTH * 0.685,
        height: MODAL_HEIGHT * 0.185,
        justifyContent: 'center',
    },
    header_image: {
        resizeMode:'cover',
        height: OPTION_HEADER_IMAGE_H,
        width: OPTION_HEADER_IMAGE_w,
        borderRadius: OPTION_HEADER_IMAGE_w /2,
        backgroundColor: 'green',
    },
    option_bar: {
        width: MODAL_WIDTH * 0.85,
        height: MODAL_HEIGHT * 0.185,
        borderBottomColor: '#ffffff90',
        borderTopColor: 'transparent',
        borderWidth: 1,
        borderLeftColor:'transparent',
        borderRightColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: five,
        flexDirection: 'row',
    }, 
    option_text: {
        color: '#ffffff',
        fontSize: seventeen
    }

})

export default OnlineOptions
