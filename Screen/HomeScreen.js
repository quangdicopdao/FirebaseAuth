import { Button } from "react-native-paper";
import React from "react";
import { View ,StyleSheet,Text} from "react-native";
import auth from '@react-native-firebase/auth'

function HomeScreen() {
    const handleLogout = ()=>{
        auth().signOut()
        .catch(err => console.log(err))
    }
    return ( 
        <View style={styles.container}>
            <Text style={styles.text}>Home</Text>x
            <Button style={styles.btn} title='Sign Out' onPress={handleLogout}>
                <Text style={styles.btnText}>Sign Out</Text>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    text:{
        fontSize:25,
        fontWeight: 'bold',
        color:'black'
    },
    btn:{
        backgroundColor:'blue',
        borderRadius:0,
        marginTop:20
    },
    btnText:{
        color:'white',
        fontSize:20
    }
})
export default HomeScreen;