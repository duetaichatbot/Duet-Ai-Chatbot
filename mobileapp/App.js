import React from "react";
import RootNavigation from "./navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [initRoute, setInitRoute] = React.useState("");

  React.useEffect(() => {
    (async () => {
      try {
        const email = await AsyncStorage.getItem("userdata");
        if (JSON.parse(email)?.length > 0) {
          setInitRoute("home");
        } else {
          setInitRoute("getstarted");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  if (initRoute !== "") {
    return <RootNavigation initRoute={initRoute} />;
  }
}
