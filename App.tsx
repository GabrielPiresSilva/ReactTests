import React from "react";
import { StyleSheet, View } from "react-native";
import FlatList from "./components/flatlist/flatlist";

export default function App() {
  return (
    <View style={styles.container}>
      <FlatList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
