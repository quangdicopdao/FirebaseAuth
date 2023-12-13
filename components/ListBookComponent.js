import React from 'react';
import { Image, StyleSheet,View,TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
function ListBookComponent({srcImg, title, author,genres,onClick}) {
    return (
     <View style={styles.wrap}>
            <TouchableOpacity style={styles.container} onPress={onClick}>
                <Image source={srcImg} style={styles.img} />
                <View style={styles.content}>
                        <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'> 
                            {title}
                        </Text>
                        <Text style={styles.txt} ellipsizeMode='tail'>{author}</Text>
                        <View style={styles.genreContainer}>
                        {genres.map((genre, index) => (
                          <React.Fragment key={genre}>
                            {index > 0 && <Text style={styles.genreSeparator}>  </Text>}
                            <View  style={styles.cateBtn}>
                              <Text style={styles.txt}>{genre}</Text>
                            </View>
                          </React.Fragment>
                        ))}
                      </View>
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
        textAlign:'center'
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
      cateBtn:{
        height:40,
        width:80,
        borderRadius:20,
        backgroundColor:'rgba(0 ,255, 0,0.5)'      ,
        justifyContent:'center'                
      },
      genreContainer: {
        flexDirection: 'row',
        marginTop: 5,
      },
      genreSeparator: {
        color: '#fff',
        fontSize: 16,
      },
})
export default ListBookComponent;