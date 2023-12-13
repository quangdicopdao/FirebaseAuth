import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { myBooksData, categoriesData } from './data';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { MyContextControllerProvider } from "./providers";
import { AuthStack } from "./navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";

const db = firestore();
const Users = db.collection('users');
const Books = db.collection('books');
const Categories = db.collection('categories');
const storageRef = storage().ref();

const initial = async () => {
  try {
    // Khởi tạo một người dùng admin
    const admin = {
      userName: "huutv@tdmu.edu.vn",
      password: "123",
      point: 200,
      address: "Binh Duong",
      role: "user",
    };

    // Lưu thông tin người dùng admin vào Firestore
    await Users.doc(admin.userName).set(admin);
    console.log("Thêm người dùng mới!");

    // Duyệt qua danh sách sách và tải lên URL ảnh bìa sách từ Storage
    for (const book of myBooksData) {
      const path = book.bookCover;

      try {
        // Lấy URL từ Firebase Storage
        const url = await storageRef.child(path).getDownloadURL();

        // Cập nhật và lưu thông tin sách vào Firestore
        book.bookCover = url;
        await Books.doc(book.id.toString()).set(book);
        console.log("Thêm sách mới!");
      } catch (error) {
        console.log("Lỗi khi tải ảnh từ Storage: ", error);
      }
    }

    // Duyệt qua danh sách danh mục và lưu vào Firestore
    for (const category of categoriesData) {
      try {
        await Categories.doc(category.id.toString()).set(category);
        console.log("Thêm danh mục mới!");
      } catch (error) {
        console.log("Lỗi khi thêm danh mục vào Firestore: ", error);
      }
    }
  } catch (error) {
    console.log("Lỗi chung khi khởi tạo: ", error);
  }
};

function App() {
  // initial()
  const [profileData, setProfileData] = useState(null);
  const [booksData, setBooksData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSnapshot = await Users.doc("huutv@tdmu.edu.vn").get();
        setProfileData(userSnapshot.data());

        const booksSnapshot = await Books.get();
        const booksResult = booksSnapshot.docs.map((doc) => doc.data());
        setBooksData(booksResult);

        const categoriesSnapshot = await Categories.get();
        const categoriesResult = categoriesSnapshot.docs.map((doc) => doc.data());
        setCategoriesData(categoriesResult);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ Firestore: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <MyContextControllerProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </MyContextControllerProvider>
  );
}

export default App;
