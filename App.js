import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthenticatedUserProvider } from './providers';
import { RootNavigator } from './navigation/RootNavigator';
import {myBooksData,categoriesData} from './data'
import firestore from '@react-native-firebase/firestore'
import  storage from '@react-native-firebase/storage'

const db = firestore();
const Users = db.collection('users');
const Books = db.collection('books');
const Categories = db.collection('categories');
const storageRef = storage().ref();  // Chỉnh sửa đây để sử dụng storage()

const initial = async () => {
  // Khởi tạo một người dùng admin
  const admin = {
    userName: "huutv@tdmu.edu.vn",
    password: "123",
    point: 200,
    address: "Binh Duong",
    role: "user"
  };

  try {
    // Lưu thông tin người dùng admin vào Firestore
    await Users.doc(admin.userName).set(admin);
    console.log("Thêm người dùng mới!");

    // Duyệt qua danh sách sách và tải lên URL ảnh bìa sách từ Storage
    for (const book of myBooksData) {
      const path =  book.bookCover;

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

// Gọi hàm initial để thực hiện các thao tác khởi tạo

function App() {
initial();
const [profileData, setProfileData] = useState(0);
const [booksData, setBooksData] = useState([]);
const [categoriesData, setCategoriesData] = useState([]);
useEffect(() => {
  Users.doc("huutv@tdmu.edu.vn").onSnapshot((u) => setProfileData(u.data()));

  Books.onSnapshot((IstBooks) => {
    const result = [];
    IstBooks.forEach((b) => result.push(b.data()));
    setBooksData(result);
  });

  Categories.get().then((IstCategories) => {
    const result = [];
    IstCategories.forEach((c) => result.push(c.data()));
    setCategoriesData(result);
  });
}, []); // Dependency array is empty, so this useEffect runs only once.


  return (
    <AuthenticatedUserProvider>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </AuthenticatedUserProvider>
  );
}

export default App;
