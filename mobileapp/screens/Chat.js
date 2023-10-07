import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/MaterialIcons";

const Chat = ({ navigation }) => {
  const chatData = {
    messages: [
      { id: "1", sender: "user", text: "Hello, John!" },
      { id: "2", sender: "other", text: "Hi there!" },
      { id: "3", sender: "user", text: "How are you?" },
      { id: "4", sender: "other", text: "I am doing well, thanks!" },
      { id: "5", sender: "user", text: "Thats great to hear!" },
    ],
  };

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMsg = {
        id: Date.now().toString(),
        sender: "user",
        text: newMessage.trim(),
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  const renderMessage = ({ item }) => {
    const messageStyle =
      item.sender === "user" ? styles.userMessage : styles.otherMessage;
    return (
      <View style={[styles.messageContainer, messageStyle]}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
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
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
        inverted
      />
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
    backgroundColor: "green",
  },
  messageText: {
    color: "#000",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
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
    top: 40,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    zIndex:10
  },
});

export default Chat;
