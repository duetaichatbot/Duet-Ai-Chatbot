import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from "../config";

const Feedback = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
 

  const handledFeedback = async () => {
    try {
      const res = await AxiosInstance.post(`/api/feedback/post-feedback`, {
        email,
        feedback,
      });
      console.log(res, 'statsus');
      if (res.status === 201) {
        alert("Thankyou! for sharing your feedback");
        navigation.navigate("home");
      }
    } catch (error) {
      console.log("failed to post feedback", error);
      alert("Something went wrong, try later!");
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        const email = await AsyncStorage.getItem("userdata");
        setEmail(JSON.parse(email));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/auth/welcomebg.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.header_sec}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome5
              name="arrow-back"
              type="MaterialIcons"
              color="white"
              size={25}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.Heading}>🌟 Feedback 🌟</Text>
        <Text style={styles.subtext}>
          Your feedback helps us grow and serve you better!
        </Text>
        <View style={styles.inputView}>
          <TextInput
            value={feedback}
            onChangeText={setFeedback}
            style={styles.inputs}
            placeholder="Give your feedback here..."
            placeholderTextColor="#c2c0c0"
            multiline={true}
            maxLength={200}
          />
        </View>

        <View style={{ marginTop: 20, width: "100%", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#C9F432",
              padding: 10,
              borderRadius: 5,
              width: "80%",
            }}
            onPress={handledFeedback}
          >
            <Text
              style={{
                color: "#000",
                fontWeight: "bold",
                letterSpacing: 1,
                textAlign: "center",
              }}
            >
              Send
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
  inputView: {
    width: "80%",
    minHeight: 150,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
  },
  inputs: {
    width: "100%",
    padding: 10,
    fontSize: 16,
    color: "white",
    fontStyle: "normal",
  },
  subtext: {
    fontSize: 13,
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
    marginTop: 20,
    flexDirection: "row",
  },
  forgotpass: {
    flexDirection: "row",
    marginTop: 10,
  },
  header_sec: {
    position: "absolute",
    width: "100%",
    height: 60,
    top: 40,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    zIndex: 10,
  },
});

export default Feedback;
