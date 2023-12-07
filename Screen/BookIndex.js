import React, { useState,useEffect } from "react";
import {Text, View,StyleSheet,Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { NavButton,BookComponent,ShowNameComponent,ButtonComponent,ListBookComponent } from "../components";
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

function BookIndex() {
    const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = useState(1)
    const [user, setUser] = useState(true)

    const [books, setBooks] = useState([]);

  useEffect(() => {
    // Lắng nghe sự thay đổi của collection "books"
    const unsubscribe = firestore().collection("books").onSnapshot((snapshot) => {
      const booksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksData);
    });

    // Hủy đăng ký lắng nghe khi component unmount
    return () => unsubscribe();
  }, []); // Dependency array là rỗng, vì chúng ta chỉ muốn lắng nghe một lần khi component được render.
    return (  
        // header
    <View style={styles.container}>
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
        <ScrollView>
            {/* list book */}
                <ScrollView contentContainerStyle={styles.wrapScrolBook} horizontal >
                    {books.map((book) =>(
                             <BookComponent 
                             key={book.id}
                             onClick={()=>{navigation.navigate('BookDetails', { book: book })}}
                             time= {book.lastRead}
                             percent={book.completion} 
                             iconPercent='layers-triple-outline' 
                             iconTime='clock' 
                             srcImg={{uri: book.bookCover}}
                         />
                    ))}
                  
                   
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
                {books.map((book) => (
                    <ListBookComponent 
                        key={book.id} 
                        title={book.bookName} 
                        author={book.author} 
                        srcImg={{uri:book.bookCover}} 
                        onClick={()=>{navigation.navigate('BookDetails', { book: book })}}/>
                ))}
        
            </ScrollView>
        </ScrollView>
    </View>);
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