import React from "react";
import { StyleSheet, TouchableOpacity, Image,View,Text } from "react-native";
import { Button } from "react-native-paper";


function BookComponent({time, percent, iconTime, iconPercent, srcImg,onClick}) {
    return ( 
        <TouchableOpacity style={styles.touchBlock} onPress={onClick}>
                    <Image source={srcImg} style={styles.img}/>
                    <View style={styles.wrapBottomImg}>
                        <Button mode="contained" icon={iconTime} style={styles.btnImg}>
                            <Text>{time}</Text>
                        </Button>
                        <Button mode="contained" icon={iconPercent} style={styles.btnImg}>
                            <Text>{percent}</Text>
                        </Button>
                    </View>
        </TouchableOpacity>
     );
}
const styles = StyleSheet.create({
    wrapBottomImg:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    img:{
        height:250,
        width:200,
        borderRadius:20,
        marginLeft:10
    },
    btnImg:{
        backgroundColor:'#050842'
    },
    touchBlock:{
        marginRight:10
    },
})
export default BookComponent;