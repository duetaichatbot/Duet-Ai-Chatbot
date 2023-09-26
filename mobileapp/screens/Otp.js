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

const Otp = ({ route, navigation }) => {
  const { email } = route.params;
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [resendOtpMessage, setResendOtpMessage] = useState("");

  const handleChangeCode = (text, index) => {
    let updatedCode = verificationCode.split("");
    updatedCode[index] = text;
    setVerificationCode(updatedCode.join(""));
  };

  const handleOtp = async () => {
    setAuthError("");
    if (verificationCode) {
      setLoading(true);
      try {
        const res = await AxiosInstance.post("/api/user/verify-otp", {
          email,
          otp: verificationCode,
        });

        if (res.status === 200) {
          navigation.navigate("newpassword", { email });
        }
        setLoading(false);
        setVerificationCode("");
      } catch (error) {
        setAuthError(error.response.data.message);
        setLoading(false);
      }
    } else {
      setAuthError("Otp required*");
    }
  };
  const resendOtp = async () => {
    setAuthError("");
    setResendOtpMessage("");

    setLoading(true);
    try {
      const res = await AxiosInstance.post("/api/user/resend-otp", {
        email,
      });

      if (res.status === 200) {
        setResendOtpMessage(res.data.message);
      }
      setLoading(false);
      setVerificationCode("");
    } catch (error) {
      setAuthError(error.response.data.message);
      setLoading(false);
    }
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
            onPress={!loading ? handleOtp : null}
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

        <View style={styles.footertext}>
          <TouchableOpacity onPress={resendOtp}>
            <Text style={{ color: "lightblue" }}> Resend OTP</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: "lightgreen" }}>{resendOtpMessage && resendOtpMessage+" ✔"}</Text>
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
