import React, { useState,useEffect } from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import { Button,  TextInput, HelperText } from 'react-native-paper';
import auth from '@react-native-firebase/auth'
import { Formik } from 'formik';
import * as Yup from 'yup'
import { useMyContextController,login } from '../providers';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        backgroundColor:'#FFFFFF',
        paddingLeft:10,
        paddingRight:10
    },
    wrapperImg: {
        flex:2,
        alignItems: 'center',
    },
    Img:{
        width:300,
        height:200,
    },

    wrapperBody:{
        flex:4
    },
    label:{
        fontSize:30,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingBottom:20
    },
    input:{
        marginBottom:20
    },
    btn:{
        marginTop:20,
        borderRadius:5,
        backgroundColor:'#FF9C2A'
    },
    linkText:{
        marginTop:20,
        fontSize:16,
        alignSelf: 'center',
        color:'#68BCFF'
    },
    

})

function Login() {
    const [show, setShow] = useState(true)
    const navigation = useNavigation()
    const [controller, dispatch] = useMyContextController();
    const {userLogin} = controller;
    useEffect(() => {
        console.log("useEffect triggered");
        if (userLogin !== null)
        { navigation.navigate("BookIndex",)
    };
      }, [userLogin]);
    const handleLogin =(values)=>{
        const{email, password} = values
        login(dispatch,email,password);
    }
    return (  
            <View style={styles.container}>
                <View style={styles.wrapperImg}>
                    <Image style={styles.Img} source={require('../assets/fire.jpg')}/>
                </View>

                <Formik 
                 initialValues={{
                     email: "",
                    password: "",
                     }}
                     onSubmit={values => handleLogin(values)}
                >
            {({handleBlur,handleChange,handleSubmit,values,touched,errors}) =>(
                <View style={styles.wrapperBody}>
                    <Text style={styles.label}>Welcome back!</Text>
                    <TextInput
                    style={styles.input}
                    label='Email'
                    value={values.email}
                    placeholder='Enter email'
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    left={<TextInput.Icon icon='email'/>}/>
                    {touched.email && errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                     

                    <TextInput
                    style={styles.input}
                    label='Password'
                    value={values.password}
                    secureTextEntry = {show}
                    placeholder='Enter password'
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    left={<TextInput.Icon icon='email'/>}
                    right={<TextInput.Icon icon='eye' onPress={()=> setShow(!show)}/> }/>
                    {touched.password && errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
                   

                    <Button mode='contained' style={styles.btn} onPress={(handleSubmit)}>
                        <Text>Login</Text>
                    </Button>

                    <Button 
                        onPress={()=> navigation.navigate('Signup')}
                    >
                        <Text style={styles.linkText}>Create a new account?</Text></Button>
                    <Button 
                        onPress={()=> navigation.navigate('ForgotPassword')}
                     >
                        <Text style={styles.linkText}>Forgot Password</Text></Button>

                </View>
                )}
           </Formik>
            </View>
    );
}

export default Login;