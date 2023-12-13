import React, { useState,useEffect } from "react";
import {Text, View,StyleSheet,Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { NavButton,BookComponent,ShowNameComponent,ButtonComponent,ListBookComponent } from "../components";
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../providers'

function BookIndex() {
    const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = useState(1)
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [{ userLogin }] = useMyContextController();
    const { name, point } = userLogin;


    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     // Lắng nghe sự thay đổi của collection "books"
//     const unsubscribe = firestore().collection("books").onSnapshot((snapshot) => {
//       const booksData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setBooks(booksData);
//     });

//     // Hủy đăng ký lắng nghe khi component unmount
//     return () => unsubscribe();
//   }, []); // Dependency array là rỗng, vì chúng ta chỉ muốn lắng nghe một lần khi component được render.


useEffect(() => {
    // Lắng nghe sự thay đổi của collection "books"
    const unsubscribeBooks = firestore().collection("books").onSnapshot((snapshot) => {
      const booksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksData);
    });

    // Lắng nghe sự thay đổi của collection "categories"
    const unsubscribeCategories = firestore().collection("categories").onSnapshot((snapshot) => {
      const categoriesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoriesData);
    });

    // Hủy đăng ký lắng nghe khi component unmount
    return () => {
      unsubscribeBooks();
      unsubscribeCategories();
    };
  }, []); // Dependency array là rỗng, vì chúng ta chỉ muốn lắng nghe một lần khi component được render.

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const categoryDoc = await firestore().collection('categories').doc(selectedCategory.toString()).get();

        if (categoryDoc.exists) {
          const booksInCategory = categoryDoc.data().books || [];
          const booksData = [];

          for (const bookId of booksInCategory) {
            const bookDoc = await firestore().collection('books').doc(bookId.toString()).get();

            if (bookDoc.exists) {
              booksData.push(bookDoc.data());
            }
          }

          setFilteredBooks(booksData);
        }
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchBooks();
  }, [selectedCategory, books]);

    return (  
        // header
    <View style={styles.container}>
            {userLogin ?  
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
    
                <ScrollView horizontal contentContainerStyle={styles.wrapCategory}>
  {categories.map((category) => (
    <Button
      key={category.id}
      mode="text"
      labelStyle={{
        color: selectedCategory === category.id ? '#fff' : '#ccc',
        fontSize: 18,
      }}
      onPress={() => setSelectedCategory(category.id)}
    >
      {category.categoryName}
    </Button>
  ))}
</ScrollView>


      <ScrollView>
        {filteredBooks.map((book) => (
          <ListBookComponent
            key={book.id}
            title={book.bookName}
            author={book.author}
            genres={book.genre}
            srcImg={{ uri: book.bookCover }}
            onClick={() => {
              navigation.navigate('BookDetails', { book });
            }}
          />
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