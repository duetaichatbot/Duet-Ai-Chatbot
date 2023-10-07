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

const NewPassword = ({ route, navigation }) => {
  const { email } = route.params;
  const [password, onChangePass] = useState("");
  const [cpassword, onChangecPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleNewPassword = async () => {
    setAuthError("");
    if (password && cpassword) {
      setLoading(true);
      try {
        const res = await AxiosInstance.patch("/api/user/reset-password", {
          password,
          cpassword,
          email,
        });
        if (res.status === 200) {
          ToastAndroid.show(
            "password change successfully!",
            ToastAndroid.SHORT
          );
          navigation.navigate("login");
        }
        setLoading(false);
        onChangePass("");
      } catch (error) {
        console.log(error.message);
        setAuthError(error.response.data.message);
        setLoading(false);
      }
    } else {
      setAuthError("All Feilds Required*");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/auth/welcomebg.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.Heading}>New Password</Text>
        <Text style={{ color: "#F7665E" }}>{authError}</Text>

        <TextInput
          value={password}
          onChangeText={onChangePass}
          style={styles.inputs}
          placeholder="New Password"
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
            onPress={!loading ? handleNewPassword : null}
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

export default NewPassword;
