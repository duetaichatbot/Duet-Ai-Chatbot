import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigation from "./navigation";

export default function App() {

  const [initRoute, setInitRoute] = React.useState("getstarted");

  return (
    <RootNavigation initRoute={initRoute} />
  );
}
