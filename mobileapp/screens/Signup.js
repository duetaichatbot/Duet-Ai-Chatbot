import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import AxiosInstance from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, onChangePass] = useState("");
  const [cpassword, onChangecPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  let emailRegex = /^\w+[\w.-]*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  const handleSignupUser = async () => {
    setAuthError("");
    if (emailRegex.test(email)) {
      setLoading(true);
      try {
        const res = await AxiosInstance.post("/api/user/register", {
          name,
          email,
          password,
          cpassword,
        });
        if (res.status === 201) {
          await AsyncStorage.setItem(
            "userdata",
            JSON.stringify(res.data.user.email)
          );
          ToastAndroid.show("login successfully!", ToastAndroid.SHORT);
          navigation.navigate("home");
        }
        setLoading(false);
        setName("");
        setEmail("");
        onChangePass("");
        onChangecPass("");
      } catch (error) {
        setAuthError(error.response.data.message);
        setLoading(false);
      }
    } else {
      setAuthError("Email is not Valid");
    }
  };

  const signUpdNav = () => {
    navigation.navigate("login");
  };

  const NavigatetoForgotpassScreen = () => {
    navigation.navigate("forgotpass");
  };

  return (
    <ImageBackground
      source={require("../assets/auth/welcomebg.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.Heading}>Signup</Text>
        <Text style={styles.text}>Create your account</Text>
        <Text style={{ color: "red" }}>{authError}</Text>
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
          secureTextEntry={true}
          keyboardShouldPersistTaps="handled"
        />
        <TextInput
          value={cpassword}
          onChangeText={onChangecPass}
          style={styles.inputs}
          placeholder="Confirm Password"
          placeholderTextColor="#c2c0c0"
          secureTextEntry={true}
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
            onPress={!loading ? handleSignupUser : null}
          >
            <Text
              style={{
                color: "#000",
                fontWeight: "bold",
                letterSpacing: 1,
                textAlign: "center",
              }}
            >
              {loading ? "loading..." : "Signup"}
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
