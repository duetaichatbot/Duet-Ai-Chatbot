import React from 'react'
import RootNavigation from "./navigation";
export default function App() {

  const [initRoute, setInitRoute] = React.useState("getstarted");

  return (
    <RootNavigation initRoute={initRoute} />
  );
}
