import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import AxiosInstance from "../config";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  let emailRegex = /^\w+[\w.-]*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  const handleForgotPassword = async () => {
    setAuthError("");
    if (email) {
      if (emailRegex.test(email)) {
        setLoading(true);
        try {
          const res = await AxiosInstance.post("/api/user/forgot-password", {
            email,
          });
          if (res.status === 200) {
            navigation.navigate("otp", { email });
          }
          setLoading(false);
          setEmail("");
        } catch (error) {
          setAuthError(error.response.data.message);
          setLoading(false);
        }
      } else {
        setAuthError("Email is not valid");
      }
    } else {
      setAuthError("Email is required*");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/auth/welcomebg.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.Heading}>Forgot Password</Text>
        <Text style={{ color: "#F7665E" }}>{authError}</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.inputs}
          placeholder="Enter Your Email"
          placeholderTextColor="#c2c0c0"
        />

        <View style={{ marginTop: 20, width: "100%", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#C9F432",
              padding: 10,
              borderRadius: 5,
              width: "80%",
            }}
            onPress={!loading ? handleForgotPassword : null}
          >
            <Text
              style={{
                color: "#000",
                fontWeight: "bold",
                letterSpacing: 1,
                textAlign: "center",
              }}
            >
              {loading ? "loading..." : "Send Email"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

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

export default ForgotPassword;
