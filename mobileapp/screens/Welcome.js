import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  SafeAreaView,
  BackHandler,
} from "react-native";
import React, { useState } from "react";
import FontAwesome5 from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const Welcome = ({ navigation }) => {
  const [logoutBtn, setLogoutBtn] = useState(false);
  const [userEmail, setUserEmail] = React.useState("");

  React.useEffect(() => {
    (async () => {
      try {
        const email = await AsyncStorage.getItem("userdata");
        setUserEmail(JSON.parse(email));
      } catch (error) {
        console.log(error, "unable to get user email!");
      }
    })();
  }, []);

  const logoutUser = async () => {
    AsyncStorage.clear()
      .then(() => {
        (err) => {
          console.log(err);
        };
      })
      .catch((err) => console.log("unable to logout", err));
    setLogoutBtn(false);
    navigation.navigate("login");
  };

  const [isWelcomeScreen, setIsWelcomeScreen] = useState(true);

  useEffect(() => {
    const backAction = () => {
      if (isWelcomeScreen) {
        BackHandler.exitApp();
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isWelcomeScreen]);

  return (
    <>
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
          <View
            style={{
              position: "relative",
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
            }}
          >
            <Text style={{ color: "#fff" }}>
              {userEmail?.split("@")?.[0]?.substring(0, 20)}
            </Text>
            <TouchableOpacity onPress={() => setLogoutBtn(!logoutBtn)}>
              <Image
                style={{ width: 50, height: 50, marginVertical: 20 }}
                source={require("../assets/auth/user_profile.png")}
              />
            </TouchableOpacity>
            {logoutBtn ? (
              <View
                style={{
                  position: "absolute",
                  bottom: -15,
                  right: 5,
                  borderRadius: 20,
                  width: 65,
                  height: 30,
                  backgroundColor: "lightgray",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity onPress={logoutUser}>
                  <Text>Logout</Text>
                </TouchableOpacity>
              </View>
            ) : null}
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
              onPress={() => navigation.navigate("chat")}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                    letterSpacing: 1,
                    textAlign: "center",
                  }}
                >
                  Ask Question?
                </Text>
                <FontAwesome5
                  name="robot-confused"
                  type="MaterialCommunityIcons"
                  color="black"
                  size={20}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
    </>

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
