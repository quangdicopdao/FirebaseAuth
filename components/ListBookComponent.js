import React from 'react';
import { Image, StyleSheet,View,TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
function ListBookComponent({srcImg, title, author}) {
    return (
     <View style={styles.wrap}>
            <TouchableOpacity style={styles.container}>
                <Image source={srcImg} style={styles.img} />
                <View style={styles.content}>
                        <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'> 
                            {title}
                        </Text>
                        <Text style={styles.txt} ellipsizeMode='tail'>{author}</Text>
                </View>
          </TouchableOpacity>
                    <View style={styles.buttonContainer}>
                        <Button mode='contained' style={styles.btn}>
                            <Icon name="bookmark" size={20} color="#fff" />
                        </Button>
                    </View>
     </View>
      );
}
const styles = StyleSheet.create({
    wrap:{
        flexDirection:'row'
    },
    container: {
        flexDirection: 'row',
        margin: 10,
      },
      content: {
        width:230,
        paddingLeft: 10,
      },
      img: {
        width: 100,
        height: 100,
        borderRadius: 10,
      },
      title: {
        color: '#fff',
        fontSize: 20,
      },
      txt: {
        color: '#fff',
        fontSize: 16,
        marginTop:10
      },
      buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      btn: {
        height: 50,
        alignSelf:'flex-start',
        marginTop:5,
        backgroundColor:'#050842'
      },
})
export default ListBookComponent;