import React from "react";
import { StyleSheet,Text } from "react-native";
import { Button } from "react-native-paper";


function NavButton({children,icon}) {
    return ( 
        <Button icon={icon} mode="contained" style={styles.btnNav}>
            <Text style={styles.txtBtn}>{children}</Text>
        </Button>
     );
}
const styles = StyleSheet.create({
    txtBtn:{
        fontSize:16,
    },
    btnNav:{
        paddingTop:10,
        paddingBottom:10,
        backgroundColor: '#333'
    },
})
export default NavButton;