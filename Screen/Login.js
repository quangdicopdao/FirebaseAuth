import React, { useState } from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { Button,  TextInput, HelperText } from 'react-native-paper';
import auth from '@react-native-firebase/auth'
import { Formik } from 'formik';
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
    }

})

function Login({navigation}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(true)

    const hasErrors = () => {
        return !email.includes('@');
      };

      const isStrongPassword = () => {
        const isLengthValid = password.length >= 8;
    
        const regexUpperCase = /[A-Z]/;
        const regexLowerCase = /[a-z]/;
        const regexDigit = /\d/;
        const regexSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    
        const isUpperCaseValid = regexUpperCase.test(password);
        const isLowerCaseValid = regexLowerCase.test(password);
        const isDigitValid = regexDigit.test(password);
        const isSpecialCharValid = regexSpecialChar.test(password);
    

        return (
          isLengthValid &&
          isUpperCaseValid &&
          isLowerCaseValid &&
          isDigitValid &&
          isSpecialCharValid
        );
      };
      const handleLogin = (values) => {
        const {email, password} =  values
        auth().signInWithEmailAndPassword(email, password)
        .then(
            () => navigation.navigate('Home')
        )
        .catch(err => console.error(err))
        

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
            {({handleBlur,handleChange,handleSubmit,values}) =>(
                <View style={styles.wrapperBody}>
                    <Text style={styles.label}>Welcome back!</Text>
                    <TextInput
                    style={styles.input}
                    name='Email'
                    value={values.email}
                    placeholder='Enter email'
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    left={<TextInput.Icon icon='email'/>}/>
                     <HelperText type="error" visible={hasErrors()}>
                         Email address is invalid!
                     </HelperText>

                    <TextInput
                    style={styles.input}
                    name='Password'
                    value={values.password}
                    secureTextEntry = {show}
                    placeholder='Enter password'
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    left={<TextInput.Icon icon='email'/>}
                    right={<TextInput.Icon icon='eye' onPress={()=> setShow(!show)}/> }/>
                    <HelperText type="error" visible={!isStrongPassword()}>
                         Password is not strong enough!
                    </HelperText>

                    <Button mode='contained' style={styles.btn} onPress={(handleSubmit)}>
                        <Text>Login</Text>
                    </Button>

                    <TouchableOpacity style={styles.linkText}
                        onPress={()=> navigation.navigate('Signup')}
                    >
                        <Text>Create a new account?</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.linkText}
                        onPress={()=> navigation.navigate('ForgotPassword')}
                     >
                        <Text>Forgot Password</Text></TouchableOpacity>
                </View>
                )}
           </Formik>
            </View>
    );
}

export default Login;