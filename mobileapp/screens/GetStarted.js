import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";

const GetStarted = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/Auth/welcomebg.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View
          style={{
            flex: 0.8,
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={styles.getstartedText}>Welcome to the Duet</Text>
            <Text style={styles.getstartedText}>AI Chatbot</Text>
          </View>
          <View>
            <Image
              style={{ width: 250, height: 300, marginVertical: 20 }}
              source={require("../assets/Auth/robot.png")}
            />
          </View>
        </View>

        <View style={styles.footer_sec}>
          <View>
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                letterSpacing: 0.5,
                textAlign: "center",
              }}
            >
              How Can I Help You!
            </Text>
          </View>
          <View style={{ marginTop: 20, width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#C9F432",
                padding: 10,
                borderRadius: 5,
                width: "150%",
              }}
              onPress={() => navigation.navigate("Login")}
            >
              <Text
                style={{
                  color: "#000",
                  fontWeight: "bold",
                  letterSpacing: 1,
                  textAlign: "center",
                }}
              >
                Let's Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "contain",
  },
  getstartedText: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
    textTransform: "capitalize",

  },
  footer_sec: {
    position: "absolute",
    bottom: 50,
  },
});

export default GetStarted;
