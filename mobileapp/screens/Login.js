import { View, Text, StyleSheet, ImageBackground  } from 'react-native'
import React from 'react'


const Login = ({ navigation }) => {




  return (
    <ImageBackground
    source={require('../assets/Auth/sin1.png')}
    style={styles.backgroundImage}
  >
    <View style={styles.container}>
      <Text style={styles.getstartedText}>Welcome to the creators hub!</Text>
      <View style={{ marginTop:20, width:"100%", alignItems: 'center',}}>
      <Button onPress={null} title="Let's Get Started" />
      </View>
    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:"grey"
    },

    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch' for different image resizing options
    },
   
    getstartedText: {
     fontSize:24,
     color:"#fff",
     fontWeight:"500",
    //  fontFamily:"NunitoSans-VariableFont_YTLC,opsz,wdth,wght",
    },
   
});

export default Login;

