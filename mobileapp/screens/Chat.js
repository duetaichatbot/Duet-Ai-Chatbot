import AxiosInstance from "../config";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/MaterialIcons";

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userEmail = route.params.email;

  
  const handleSendMessage = async () => {
    console.log(userEmail, 'eail emaisdf');
    setIsLoading(true);
    setMessages((prev) => {
      return [...prev, { text: newMessage, from: "user" }];
    });

    try {
      let response = await AxiosInstance.post("/messages", {
        query: newMessage,
        userId: userEmail
      });
      if (response.status === 200) {
        console.log("responsewa",response.data);
        setNewMessage("");
        setTimeout(() => {
          setMessages((prev) => {
            return [
              ...prev,
              {
                text: response?.data?.message?.text,
                from: "bot",
              },
            ];
          });
          setIsLoading(false);
        }, 500);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error, "webhook failed");
      alert("🚫 Something went wrong, try later");
    }
  };


  const renderMessage = ({ item }) => {
    const messageStyle =
      item.from === "user" ? styles.userMessage : styles.otherMessage;
    return (
      <>
        <View style={[styles.messageContainer, messageStyle]}>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header_sec}>
        <View style={{ flexDirection: "row", gap: 15 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome5
              name="arrow-back"
              type="MaterialIcons"
              color="white"
              size={25}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              letterSpacing: 0.5,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            DUET AI
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#efefef",
              padding: 5,
              borderRadius: 5,
              flexDirection: "row",
              gap: 5,
            }}
            onPress={() => navigation.navigate("feedback")}
          >
            <Text style={{ color: "#000" }}>Feedback</Text>
            <FontAwesome5
              name="feedback"
              type="MaterialIcons"
              color="black"
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={messages.slice().reverse()}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messagesContainer}
        inverted
      />
      <>
        {isLoading ? (
          <View style={[styles.messageContainer, styles.otherMessage, styles.loadingBot]}>
              <Image
                style={{ width: 50, height: 10}}
                source={require("../assets/loading.gif")}
              />
          </View>
        ) : null}
      </>
      <View style={styles.inputContainer}>

        <TextInput
          style={styles.textInput}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your question..."
          />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Ask</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  messagesContainer: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  messageContainer: {
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#C9F432",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "white",
  },
  messageText: {
    color: "#000",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    zIndex: 100,
    backgroundColor:"black",
    height: 50
  },
  textInput: {
    flex: 1,
    // width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    zIndex:101
  },
  sendButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#C9F432",
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#000",
    fontSize: 16,
  },
  header_sec: {
    position: "absolute",
    width: "100%",
    height: 60,
    top: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    zIndex: 10,
    backgroundColor:"black"
  },
  loadingBot: {
    marginLeft: 11,
  }
});

export default Chat;
