import { EventItem } from "@/components/EventItem";
import { supabase } from "@/lib/supabase";
import { EventType } from "@/types/Event";
import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  FlatList,
  View,
  RefreshControl,
} from "react-native";

function Screen() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  async function getEvents() {
    console.log("START REFRESH");
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("start_date", { ascending: true });
    await new Promise((r) => setTimeout(r, 1000));
    console.log("END REFRESH");
    return data as EventType[];
  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const eventsData = await getEvents();
    setEvents(eventsData);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    async function loadData() {
      setRefreshing(true);
      const eventsData = await getEvents();
      setEvents(eventsData);
      setRefreshing(false);
    }

    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        style={styles.container}
        stickyHeaderHiddenOnScroll
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.beforeTitle}>Todos los eventos en:</Text>
            <Text style={styles.title}>Guayaquil</Text>
            <Text style={styles.subTitleComment}>
              {refreshing ? (
                "Cargando..."
              ) : (
                <>
                  Actualizado el{" "}
                  {new Date(events?.[0]?.last_updated || "").toLocaleDateString(
                    "es-EC",
                    {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    }
                  )}
                </>
              )}
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={events}
        renderItem={({ item }) => <EventItem event={item} fullWidth />}
        keyExtractor={(item) => item.slug}
        contentContainerStyle={{ gap: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    marginHorizontal: 20,
  },
  header: {
    paddingTop: 30,
    marginBottom: 0,
    backgroundColor: "white",
  },
  list: {
    // paddingTop: 16,
  },
  beforeTitle: {
    fontSize: 14,
    color: "#303030",
    fontWeight: "bold",
    marginBottom: -3,
  },
  title: {
    fontSize: 40,
    color: "#101010",
    fontWeight: "bold",
    margin: 0,
    padding: 0,
  },
  subTitle: {
    fontSize: 20,
    lineHeight: 28,
    color: "#101010",
    fontWeight: "bold",
    padding: 0,
  },
  subTitleComment: {
    color: "#9ca3af",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
});

export default Screen;
