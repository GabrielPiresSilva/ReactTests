import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";

import controller from "../../services/controler";

import axios from "axios";

export default function flatlist() {
  const perPage = 3;

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadApi({ refresh: false });
  }, []);

  async function loadApi({ refresh }: any) {
    if (loading) return;

    setLoading(true);
    const response: any = await controller.request(
      "GET",
      // `/search/repositories?q=react&per_page=${perPage}&_page=${page}`
      `photos?_limit=${perPage}&_page=${page}`
    );
    if (refresh) {
      setData([...response]);
    } else {
      setData([...data, ...response]);
    }

    setPage(page + 1);
    setLoading(false);
    setRefresh(false);
  }

  function onRefresh() {
    setPage(1);
    setRefresh(true);
    loadApi({ refresh: true });
  }

  return (
    <>
      <FlatList
        style={{ marginTop: 35 }}
        contentContainerStyle={{ marginHorizontal: 20 }}
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ListItem data={item} />}
        onEndReached={loadApi}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<FooterList load={loading} />}
        onRefresh={() => onRefresh()}
        refreshing={refresh}
      />
    </>
  );
}

function ListItem({ data }: any) {
  return (
    <View style={{ borderColor: "black", borderWidth: 1, marginTop: 10 }}>
      <View style={styles.itemBox}>
        {/* <Text>{data.full_name}</Text> */}
        <Text>{data.title}</Text>
        <Image style={styles.image} source={{ uri: data.url }} />
      </View>
    </View>
  );
}

function FooterList({ load }: any) {
  if (!load) return null;
  return (
    <View style={styles.loading}>
      <ActivityIndicator size={25} color="#121212" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  itemBox: {
    backgroundColor: "lightblue",
    justifyContent: "space-between",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 280,
    borderColor: "yellow",
    borderWidth: 1,
  },
  loading: {
    padding: 10,
  },
});
