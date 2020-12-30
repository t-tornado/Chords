import React from 'react'
import {Modal,StyleSheet,View,Text,Dimensions, TouchableOpacity, Image} from 'react-native'
import { Colors } from '../../assets/colors'
import { fifteen, five, seven, seventeen, ten, twenty } from '../../Config/Dimensions'
import {
    MaterialCommunityIcons,
    MaterialIcons,
    AntDesign

} from 'react-native-vector-icons'

const {height, width} = Dimensions.get('window')
const MODAL_HEIGHT = height * 0.52;
const MODAL_WIDTH = width * 0.95;
const OPTION_HEADER_IMAGE_H = MODAL_HEIGHT * 0.185
const OPTION_HEADER_IMAGE_w = MODAL_HEIGHT * 0.185

const OfflineOption = () => {
    const [modal,setModal] = React.useState(true)
const closeModal = () => [
    setModal(false)
]

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
                    <Text  >Title</Text>
                    <Text>Choir</Text>
                    <Text>Composer</Text>
                </View>
            </View>
            <View style={styles.body} >
                <TouchableOpacity style={styles.option_bar} activeOpacity={0.85}  >
                    <AntDesign name='heart' size={twenty} color={Colors.bottom_tab_active_icon} style={{paddingHorizontal: ten}} />
                    <Text style={styles.option_text} >Add To Favorites</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option_bar} activeOpacity={0.85} >
                    <MaterialIcons name='delete' size={twenty} color={Colors.to_delete_delete_icon} style={{paddingHorizontal: ten}} />
                    <Text style={styles.option_text} >Remove From Downloads</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option_bar} activeOpacity={0.85} onPress={closeModal} >
                    <MaterialIcons name='delete' size={twenty} color={Colors.bottom_tab_active_icon} style={{paddingHorizontal: ten}}/>
                    <Text style={styles.option_text} >Remove From Favorites</Text>
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
        height: MODAL_HEIGHT * 0.205,
        width: MODAL_WIDTH,
        padding: ten,
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

export default OfflineOption