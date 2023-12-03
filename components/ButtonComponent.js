import React from "react";
import { View,StyleSheet,Text } from "react-native";
import { Button } from "react-native-paper";

function ButtonComponent({mode,icon,children}) {
    return ( 
        <View>
            <Button mode={mode} icon={icon} style={styles.btn}><Text style={{fontSize:16}}>{children}</Text></Button>
        </View>
     );
}
const styles = StyleSheet.create({
    btn:{
        width:150,
        alignSelf:'flex-end',
        backgroundColor:'#f98d09',
        borderRadius:10,
        margin:15,
    },
    txtBtn:{
        fontSize:20,
        fontWeight:'bold',
    }
})

export default ButtonComponent;