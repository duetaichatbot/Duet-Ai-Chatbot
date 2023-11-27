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
            {/* <Text
              style={{
                color: "#fff",
                fontSize: 18,
                letterSpacing: 0.5,
                textAlign: "center",
              }}
            >
              DUET AI
            </Text> */}
            <Image source={require("../assets/auth/logo.png")}
            style={{width: 100, height: 50}}
            />

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
            {/* <TouchableOpacity onPress={() => setLogoutBtn(!logoutBtn)}> */}
            <TouchableOpacity onPress={logoutUser}>
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
                  right: 15,
                  borderRadius: 20,
                  width: 150,
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
              onPress={() => navigation.navigate("chat", {email:userEmail})}
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
// import React, { useState, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   ImageBackground,
//   TouchableOpacity,
// } from "react-native";
// import AxiosInstance from "../config";

// const Welcome = ({ route, navigation }) => {
//   // const { email } = route.params;
//   const  email  = "ashar@gmail.com";
//   const [loading, setLoading] = useState(false);
//   const [authError, setAuthError] = useState("");
//   const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);

//   const [resendOtpMessage, setResendOtpMessage] = useState("");
//   const otpInputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

//   const handleOTPChange = (text, index) => {
//     if (text.length === 1 && index < 3) {
//       otpInputs[index + 1].current.focus();
//     }

//     const newOtp = [...verificationCode];
//     newOtp[index] = text;
//     setVerificationCode(newOtp);
//   };

//   const handleOtp = async () => {
//     const otpCode = verificationCode.join("");
//     setAuthError("");
//     if (otpCode) {
//       setLoading(true);
//       try {
//         const res = await AxiosInstance.post("/api/user/verify-otp", {
//           email,
//           otp: otpCode,
//         });

//         if (res.status === 200) {
//           navigation.navigate("newpassword", { email });
//         }
//         setLoading(false);
//         setVerificationCode(["", "", "", ""]);
//       } catch (error) {
//         setAuthError(error.response.data.message);
//         setLoading(false);
//       }
//     } else {
//       setAuthError("Otp required*");
//     }
//   };
//   const resendOtp = async () => {
//     setAuthError("");
//     setResendOtpMessage("");

//     setLoading(true);
//     try {
//       const res = await AxiosInstance.post("/api/user/resend-otp", {
//         email,
//       });

//       if (res.status === 200) {
//         setResendOtpMessage(res.data.message);
//       }
//       setLoading(false);
//       setVerificationCode(["", "", "", ""]);
//     } catch (error) {
//       setAuthError(error.response.data.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <ImageBackground
//       source={require("../assets/auth/welcomebg.jpg")}
//       style={styles.backgroundImage}
//     >
//       <View style={styles.container}>
//         <Text style={styles.Heading}>Verify OTP</Text>
//         <Text style={styles.text}>Check your email</Text>
//         <Text style={{ color: "#F7665E" }}>{authError}</Text>
//         <View style={{ flexDirection: "row" }}>
//           {verificationCode.map((digit, index) => (
//             <TextInput
//               key={index}
//               ref={otpInputs[index]}
//               style={styles.inputs}
//               keyboardType="numeric"
//               maxLength={1}
//               value={digit}
//               onChangeText={(text) => handleOTPChange(text, index)}
//             />
//           ))}
//         </View>

//         <View style={{ marginTop: 20, width: "100%", alignItems: "center" }}>
//           <TouchableOpacity
//             style={{
//               backgroundColor: "#C9F432",
//               padding: 10,
//               borderRadius: 5,
//               width: "80%",
//             }}
//             onPress={!loading ? handleOtp : null}
//           >
//             <Text
//               style={{
//                 color: "#000",
//                 fontWeight: "bold",
//                 letterSpacing: 1,
//                 textAlign: "center",
//               }}
//             >
//               {loading ? "loading..." : "Submit"}
//             </Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.footertext}>
//           <TouchableOpacity onPress={resendOtp}>
//             <Text style={{ color: "lightblue" }}> Resend OTP</Text>
//           </TouchableOpacity>
//         </View>
//         <Text style={{ color: "lightgreen" }}>
//           {resendOtpMessage && resendOtpMessage + " ✔"}
//         </Text>
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.2)",
//   },
//   inputs: {
//     height: 50,
//     paddingHorizontal: 10,
//     backgroundColor: "rgba(255, 255, 255, 0.2)",
//     borderRadius: 5,
//     margin: 10,
//     fontSize: 18,
//     color: "white",
//     fontStyle: "normal",
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: "400",
//     color: "#D3D3D3",
//     marginBottom: 30,
//   },
//   Heading: {
//     fontSize: 30,
//     fontWeight: "600",
//     color: "#fff",
//     marginBottom: 5,
//   },
//   backgroundImage: {
//     flex: 1,
//     resizeMode: "cover",
//   },
//   footertext: {
//     marginTop: 40,
//     flexDirection: "row",
//   },
//   forgotpass: {
//     flexDirection: "row",
//     marginTop: 10,
//   },
// });

// export default Welcome;
