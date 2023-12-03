import React, { useState } from "react";
import {Text, View,StyleSheet,Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { NavButton,BookComponent,ShowNameComponent,ButtonComponent,ListBookComponent } from "../components";
import { useNavigation } from '@react-navigation/native';
import data from '../data'

function BookIndex() {
    const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = useState(1)
    const [user, setUser] = useState(true)
    return (  
        // header
    <ScrollView style={styles.container}>
            {user ?  
            <ShowNameComponent/> 
            : 
            <ButtonComponent mode='contained' icon='login'>Login</ButtonComponent>}
           
            
        {/* //nav btn */}
        <View style={styles.wrapBtn}>
            <NavButton icon='line-scan'>Claim</NavButton>
            <Text style={styles.txtSev}>|</Text>
            <NavButton icon='bullseye'>Get point</NavButton>
            <Text style={styles.txtSev}>|</Text>
            <NavButton icon='credit-card'>My card</NavButton>
        </View>
        {/* list book */}
            <ScrollView contentContainerStyle={styles.wrapScrolBook} horizontal>
                <BookComponent 
                    onClick={()=>{navigation.navigate('BookDetails')}}
                    time='3d 7h' 
                    percent='70%' 
                    iconPercent='layers-triple-outline' 
                    iconTime='clock' 
                    srcImg={require('../assets/img/books/OtherWordsForHome.jpg')}
                />
            </ScrollView>
            {/* tab navigation */}

        <ScrollView contentContainerStyle={styles.wrapCategory}>
                <Button mode="text"
                labelStyle={{
                    color:(setSelectedCategory== 1)? '#fff' : '#ccc'
                    ,fontSize:18
                }}>
                    Best Seller
                </Button>
                <Button mode="text"
                labelStyle={{
                    color:(setSelectedCategory== 1)? '#fff' : '#ccc'
                    ,fontSize:18
                }}>
                    The lastest
                </Button>
                <Button mode="text"
                labelStyle={{
                    color:(setSelectedCategory== 1)? '#fff' : '#ccc'
                    ,fontSize:18
                }}>
                    Coming soon
                </Button>
        </ScrollView >
        <ScrollView>
                <ListBookComponent title='Other words for home aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' author='john cena' srcImg={require('../assets/img/books/OtherWordsForHome.jpg')}/>
                <ListBookComponent title='Other words for home' author='john cena' srcImg={require('../assets/img/books/TheMetropolist.jpg')}/>
                <ListBookComponent title='Other words for home' author='john cena' srcImg={require('../assets/img/books/TheTinyDragon.jpg')}/>
                <ListBookComponent title='Other words for home' author='john cena' srcImg={require('../assets/img/books/Underland.jpg')}/>
        </ScrollView>
    </ScrollView>);
}

export default BookIndex;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#050842',
    },
    // //header
    // wrapperHeader:{
    //    flexDirection: 'row',
    //    justifyContent: 'flex-end',
    //    alignItems:'center',
    //    paddingLeft:12,
    //    paddingRight:12,
    //    paddingTop:10,
    //    marginBottom:30
    // },
   
  
   
    //btn navbar
    wrapBtn:{
        flexDirection:'row',
        height:70,
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor: '#333',
        borderRadius:10,
        marginLeft:10,
        marginRight:10,
        marginBottom:30
    },
    
    txtSev:{
        fontSize:30,
        color:'#ccc',
    },
    //list book
    wrapScrolBook:{
        height:300,
        flexDirection: 'row',
    },
  
   
   
   
    // categoryButton
    wrapCategory:{
        flexDirection:'row',
        justifyContent:'space-around',
    }
})