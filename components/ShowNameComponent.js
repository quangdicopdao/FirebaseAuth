import React from "react";
import { StyleSheet,View,Text } from "react-native";
import { Button } from "react-native-paper";

function ShowNameComponent() {
    return ( 
            <View style={styles.wrapperHeader}>
                <View>
                    <Text style={styles.txtHeader}>Good morning</Text>
                    <Text  style={styles.txtUserName} >Đặng Việt Quang</Text>
                </View>
                <Button icon='plus-circle' mode="contained" style={styles.btnHeader}>
                    <Text style={styles.txtBtn}>200 point</Text>
                </Button>
            </View>
          
     );
}
const styles = StyleSheet.create({
    wrapperHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingLeft:12,
        paddingRight:12,
        paddingTop:10,
        marginBottom:30
     },
    txtHeader:{
        fontSize:16,
        fontWeight: 'bold',
        color:'#fff'
    },
    txtUserName:{
        fontSize:20,
        fontWeight: 'bold',
        color:'#fff'
    },
    btnHeader:{
        backgroundColor:'#f98d09'
    },
    txtBtn:{
        fontSize:16,
    },
})
export default ShowNameComponent;