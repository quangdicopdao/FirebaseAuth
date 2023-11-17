import React, { useState } from 'react';
import {View,  StyleSheet, Text, Alert} from 'react-native';
import { Button,  TextInput, HelperText } from 'react-native-paper';
import auth from '@react-native-firebase/auth'
import { Formik } from 'formik';

function SignUp({navigation}) {
    const [show, setShow] = useState(true)
    const [email,setEmail] = useState('')
    const [password,setpassword] = useState('')
    const [confirmpassword,setConfirmPassword] = useState('')

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
        const isConfirm = password === confirmpassword;

        return (
          isLengthValid &&
          isUpperCaseValid &&
          isLowerCaseValid &&
          isDigitValid &&
          isSpecialCharValid &&
          isConfirm
        );
      };
    const handleSignUp = async values =>{
        const {email, password} = values
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
            () => navigation.navigate('Login')

        )
        .catch(err => console.log(err))
    }
    return ( 
        <Formik 
        initialValues={{
            email : '',
            password : '',
            confirmpassword : ''
        }}
        onSubmit={values => handleSignUp(values)}
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
                     <HelperText style={styles.hpText} type="error" visible={touched.email  && hasErrors()}>
                         Email address is invalid!
                     </HelperText>

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

                    <HelperText style={styles.hpText} type="error" visible={ touched.password && !isStrongPassword()}>
                         Password is not strong enough!
                    </HelperText>


                    <TextInput
                    style={styles.input}
                    label='Confirm Password'
                    value={values.confirmpassword}
                    secureTextEntry = {show}
                    placeholder='Enter confirm password'
                    onChangeText={handleChange('confirmpassword')}
                    onBlur={handleBlur('confirmpassword')}
                    left={<TextInput.Icon icon='email'/>}
                    right={<TextInput.Icon icon='eye' onPress={()=> setShow(!show)}/> }/>

                    <HelperText style={styles.hpText} type="error" visible={touched.confirmpassword && !isStrongPassword()}>
                         Confirm password is not same with password!
                    </HelperText>


                    <Button mode='contained' style={styles.btn} onPress={handleSubmit}>
                        <Text>Sign Up</Text>
                    </Button>
             
                    

                    <Button 
                    onPress={() => navigation.navigate('Login')}
                    ><Text style={styles.linkText}>Already have an account?</Text>
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
    hpText:{
        marginBottom:10
    }
})
export default SignUp;