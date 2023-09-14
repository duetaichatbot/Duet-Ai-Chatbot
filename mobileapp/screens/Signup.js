import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, onChangePass] = useState("");
  const [cpassword, onChangecPass] = useState("");

  let emailRegex = /^\w+[\w.-]*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  const handleLoginUser = async () => {};

  const signUpdNav = () => {
    navigation.navigate("login");
  };

  const NavigatetoForgotpassScreen = () => {
    navigation.navigate("forgotpass");
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require("../assets/auth/welcomebg.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.Heading}>Signup</Text>
        <Text style={styles.text}>Create your account</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.inputs}
          placeholder="Name"
          placeholderTextColor="#c2c0c0"
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.inputs}
          placeholder="Email"
          placeholderTextColor="#c2c0c0"
        />
        <TextInput
          value={password}
          onChangeText={onChangePass}
          style={styles.inputs}
          placeholder="Password"
          placeholderTextColor="#c2c0c0"
          secureTextEntry={false}
          keyboardShouldPersistTaps="handled"
        />
        <TextInput
          value={cpassword}
          onChangeText={onChangecPass}
          style={styles.inputs}
          placeholder="Confirm Password"
          placeholderTextColor="#c2c0c0"
          secureTextEntry={false}
          keyboardShouldPersistTaps="handled"
        />

        <View style={{ marginTop: 20, width: "100%", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#C9F432",
              padding: 10,
              borderRadius: 5,
              width: "80%",
            }}
            onPress={handleLoginUser}
          >
            <Text
              style={{
                color: "#000",
                fontWeight: "bold",
                letterSpacing: 1,
                textAlign: "center",
              }}
            >
              Signup
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footertext}>
          <Text style={{ color: "#fff" }}>Already have an account?</Text>
          <TouchableOpacity onPress={signUpdNav}>
            <Text style={{ color: "lightblue" }}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  inputs: {
    width: "80%",
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
    margin: 10,
    fontSize: 18,
    color: "white",
    fontStyle: "normal",
  },
  text: {
    fontSize: 18,
    fontWeight: "400",
    color: "#D3D3D3",
    marginBottom: 30,
  },
  Heading: {
    fontSize: 35,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  footertext: {
    marginTop: 40,
    flexDirection: "row",
  },
  forgotpass: {
    flexDirection: "row",
    marginTop: 10,
  },
});

export default Signup;
