import React, { useState } from 'react';
import {View,  StyleSheet, Text, Alert} from 'react-native';
import { Button,  TextInput, HelperText } from 'react-native-paper';
import auth from '@react-native-firebase/auth'
import { Formik } from 'formik';
import * as Yup from 'yup'

function SignUp({navigation}) {
    const [show, setShow] = useState(true)
    

    

    //validate
    const validateSchema = Yup.object().shape({
        email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
        password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số, và 1 ký tự đặc biệt').required('Vui lòng nhập mật khẩu'),
        confirmpassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
        .required('Vui lòng nhập lại mật khẩu'),
    })
    //signup
    const handleSignUp = async values =>{
    const {email, password} = values
        const isValidInfo = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
                auth()
                .createUserWithEmailAndPassword(email, password)
                .then(
                    () => navigation.navigate('Login')
                )
                .catch(err => console.log(err));
        }
    return ( 
        <Formik 
        initialValues={{
            email : '',
            password : '',
            confirmpassword : ''
        }}
        onSubmit={values => handleSignUp(values)}
        validationSchema={validateSchema}
        >
            {({handleBlur,handleChange,handleSubmit,values,touched,errors}) =>(
        <View style={styles.container}>
            <Text style={styles.label}>Create a new account!</Text>
           
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
                    left={<TextInput.Icon icon='key'/>}
                    right={<TextInput.Icon icon='eye' onPress={()=> setShow(!show)}/> }/>
                    {touched.password && errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}


                    


                    <TextInput
                    style={styles.input}
                    label='Confirm Password'
                    value={values.confirmpassword}
                    secureTextEntry = {show}
                    placeholder='Enter confirm password'
                    onChangeText={handleChange('confirmpassword')}
                    onBlur={handleBlur('confirmpassword')}
                    left={<TextInput.Icon icon='key'/>}
                    right={<TextInput.Icon icon='eye' onPress={()=> setShow(!show)}/> }/>
                    {touched.confirmpassword && errors.confirmpassword && <Text style={{ color: 'red' }}>{errors.confirmpassword}</Text>}

                    
                    


                    <Button mode='contained' style={styles.btn} onPress={handleSubmit}>
                        <Text>Sign Up</Text>
                    </Button>
             
                    

                    <Button 
                    onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.linkText}>Already have an account?</Text>
                    </Button>
        </View>
           )}
           </Formik>
     );
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor:'#FFFFFF',
        paddingLeft:10,
        paddingRight:10
    },
    label:{
        fontSize:30,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingBottom:20
    },
    input:{
        marginTop:20
    },
    btn:{
        marginTop:20,
        borderRadius:5,
        backgroundColor:'#FF9C2A'
    },
    linkText:{
        fontSize:16,
        marginTop:20,
        alignSelf: 'center',
        color:'#68BCFF'
    },
    
    
})
export default SignUp;