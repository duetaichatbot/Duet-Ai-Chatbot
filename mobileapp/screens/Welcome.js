import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import React from "react";

const Welcome = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/auth/welcomebg.jpg")}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header_sec}>
          <View>
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                letterSpacing: 0.5,
                textAlign: "center",
              }}
            >
              DUET AI
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
            <Text style={{ color: "#fff" }}>
              {"Malik Muhammad".substring(0, 20)}
            </Text>

            <Image
              style={{ width: 50, height: 50, marginVertical: 20 }}
              source={require("../assets/auth/user_profile.png")}
            />
          </View>
        </View>
        <View
          style={{
            flex: 0.8,
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <View style={{ width: "100%", padding: 20 }}>
            <Text style={styles.getstartedText}>
              Introducing <Text style={{ color: "#C9F432" }}>DUET</Text>
            </Text>
            <Text style={styles.getstartedText}>AI Chatbot</Text>
            <Text style={styles.about}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters. the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters.
            </Text>

            <TouchableOpacity
              style={{
                backgroundColor: "#C9F432",
                padding: 10,
                borderRadius: 5,
                width: "50%",
                marginTop: 50,
              }}
              onPress={() => navigation.navigate("login")}
            >
              <Text
                style={{
                  color: "#000",
                  fontWeight: "bold",
                  letterSpacing: 1,
                  textAlign: "center",
                }}
              >
                Ask Question
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
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
    textAlign: "left",
    letterSpacing: 1,
  },
  about: {
    color: "#fff",
    marginTop: 10,
    fontSize: 15,
    letterSpacing: 0.5,
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
  },
});

export default Welcome;
