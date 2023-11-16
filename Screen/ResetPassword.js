import React, { useState } from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import { Button, Icon, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth'
import { Formik } from 'formik';


function ResetPassword({navigation}) {
    const [email, setEmail] = useState('')

    const handleSendPassword = (values) => {
        const {email} = values
        auth().sendPasswordResetEmail(email)
        .then(() =>{
            console.log('Success: Password Reset Email sent.')
        })
        .catch(err => console.log(err))
    }

    return (
        <Formik 
                 initialValues={{
                     email: "",
                     }}
                     onSubmit={values => handleSendPassword(values)}
                >
            {({handleBlur,handleChange,handleSubmit,values}) =>(
        <View style={styles.container} >
            <Text style={styles.label}>Reset Password</Text>
                <TextInput
                style={styles.input}
                name='Email'
                value={values.email}
                placeholder='Enter email'
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                left={<TextInput.Icon icon='email'/>}/>
                <Button mode='contained' style={styles.btn} onPress={handleSubmit}><Text>Send Reset Email</Text></Button>
                <Button onPress={() => navigation.navigate('Login')}><Text style={styles.linkText}>Go back to Login</Text></Button>
            
        </View> 
            )}
            </Formik>
     )
    ;
}

const styles = StyleSheet.create({
    container: {
        paddingLeft:10,
        paddingRight:10
    },
    label:{
        fontSize:30,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        paddingBottom:20
    },
    input:{
        marginBottom:20
    },
    btn:{
        marginTop:10,
        borderRadius:5,
        backgroundColor:'#FF9C2A'
    },
    linkText:{
        fontSize:16,
        marginTop:20,
        alignSelf: 'center',
        color:'#68BCFF'
    }
})
export default ResetPassword;