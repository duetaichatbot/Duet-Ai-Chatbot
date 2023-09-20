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
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from "../config";

const Otp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, onChangePass] = useState("");
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [verificationCode, setVerificationCode] = useState('');
  const [otp, setOtp] = useState("");

  const handleChangeCode = (text, index) => {
    
    let updatedCode = verificationCode.split("");
    updatedCode[index] = text;
    setVerificationCode(updatedCode.join(""));
  };

  let emailRegex = /^\w+[\w.-]*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  const handleLoginUser = async () => {

    // setAuthError("");
    // if (emailRegex.test(email)) {
    //   setLoading(true);
    //   try {
    //     const res = await AxiosInstance.post("/api/user/login", {
    //       email,
    //       password,
    //     });
    //     if (res.status === 200) {
    //       await AsyncStorage.setItem(
    //         "userdata",
    //         JSON.stringify(res.data.user.email)
    //       );
    //       ToastAndroid.show("login successfully!", ToastAndroid.SHORT);
    //       navigation.navigate("home");
    //     }
    //     setLoading(false);
    //     setEmail("");
    //     onChangePass("");
    //   } catch (error) {
    //     setAuthError(error.response.data.message);
    //     setLoading(false);
    //   }
    // } else {
    //   setAuthError("Email is not Valid");
    // }
  };

  return (
    <ImageBackground
      source={require("../assets/auth/welcomebg.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.Heading}>Verify OTP</Text>
        <Text style={styles.text}>Check your email</Text>
        <Text style={{ color: "red" }}>{authError}</Text>
        <View style={{ flexDirection: "row" }}>
          {/* {[0, 1, 2, 3].map((item) => (
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.inputs}
              placeholder=" "
              placeholderTextColor="#c2c0c0"
              keyboardType="numeric"
            />
          ))} */}

          {[0, 1, 2, 3].map((index) => (
            <TextInput
              key={index}
              style={styles.inputs}
              value={verificationCode[index] || ""}
              onChangeText={(text) => handleChangeCode(text, index)}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </View>

        <View style={{ marginTop: 20, width: "100%", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#C9F432",
              padding: 10,
              borderRadius: 5,
              width: "80%",
            }}
            onPress={!loading ? handleLoginUser : null}
          >
            <Text
              style={{
                color: "#000",
                fontWeight: "bold",
                letterSpacing: 1,
                textAlign: "center",
              }}
            >
              {loading ? "loading..." : "Submit"}
            </Text>
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
    // width: "80%",
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
    fontSize: 30,
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

export default Otp;
