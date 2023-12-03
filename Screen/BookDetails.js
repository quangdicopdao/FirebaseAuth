import React from "react";
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LineDevider = () => {
  return (
    <View style={{ width: 1, paddingVertical: 5 }}>
      <View style={{ flex: 1, borderLeftColor: '#ccc', borderLeftWidth: 1 }}></View>
    </View>
  );
};

function BookDetails() {
  const navigation = useNavigation();
  const book = true; // Thêm biến book để kiểm tra

  function renderBookDescription() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
        <View style={{ width: 4, height: '100%', backgroundColor: "#ccc" }}>
        </View>
        <ScrollView
          contentContainerStyle={{ paddingLeft: 10 }}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold',color:'#fff' }}>Description</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' ,color:'#fff'}}>Book Description</Text>
        </ScrollView>
      </View>
    );
  }

  function renderBookInfoSection() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/img/books/OtherWordsForHome.jpg')}
          resizeMode="cover"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            backgroundColor: 'rgba(240, 248, 255, 0.7)'
          }}>
        </View>
        {/* navigation header */}
        <View style={{ flexDirection: 'row', paddingHorizontal: 10, height: 60, alignItems: 'flex-end', backgroundColor: '#fff' }}>
          <Button
            mode="contained"
            style={{
              marginLeft: 5,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}
            onPress={() => { navigation.goBack() }}><Icon name='arrow-left' size={25} color="#000" /></Button>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 50 }}>
            <Text style={{ alignSelf: 'center',fontSize:20, fontWeight:'bold' }}>Book Details</Text>
          </View>
          <Button
            mode="contained"
            style={{
              marginLeft: 10,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}
            onPress={() => { navigation.goBack() }}><Icon name='more' size={25} color="#000" /></Button>
        </View>
        {/* book cover */}
        <View style={{ flex: 5, paddingTop: 10, alignItems: 'center', justifyContent: 'flex-start' }}>
          <Image
            source={require('../assets/img/books/OtherWordsForHome.jpg')}
            resizeMode='contain'
            style={{ flex: 1, width: 150, height: 'auto', }} />
        </View>
        {/* bookname and author */}
        <View style={{ flex: 1.8, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Name</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Author</Text>
        </View>
        {/* book info */}
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 20,
            margin: 20,
            borderRadius: 10,
            backgroundColor: 'rgba(0,0,0,0.3)'
          }}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>4.5</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Rating</Text>
          </View>
          <LineDevider />
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>345</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Number of Page</Text>
          </View>
          <LineDevider />
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Eng</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Language</Text>
          </View>
        </View>
      </View>
    );
  }

  function renderBottomButton() {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Button mode="contained" style={{backgroundColor:'#050842',justifyContent:'center',height:50}} >
          <Icon name='bookmark' size={25} />
        </Button>
        <Button mode="contained" style={{backgroundColor:'#ff7b00',flex:1,justifyContent:'center',borderRadius:10,height:50,marginRight:10}}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Start reading</Text>
        </Button>
      </View>
    );
  }

  if (book) {
    return (
      <View style={{ flex: 1, backgroundColor: '#050842' }}>
        <View style={{ flex: 4 }}>
          {renderBookInfoSection()}
        </View>
        <View style={{ flex: 2 }}>
          {renderBookDescription()}
        </View>
        <View style={{ height: 70, marginBottom: 30 }}>
          {renderBottomButton()}
        </View>
      </View>
    );
  }
  else {
    return null;
  }
}

export default BookDetails;
