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
} from "react-native";

function Screen() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getEvents() {
      setIsLoading(true);
      const { data } = await supabase
        .from("events")
        .select("*")
        .limit(12)
        .order("start_date", { ascending: true });
      setEvents(data as EventType[]);
      setIsLoading(false);
    }
    getEvents();
  }, [[]]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.beforeTitle}>Busca eventos en:</Text>
          <Text style={styles.title}>Guayaquil</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subTitle}>Eventos en tendencia</Text>
          <Text style={styles.subTitleComment}>
            Actualizado el{" "}
            {new Date(events[0]?.last_updated || "").toLocaleDateString(
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
          </Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={events}
            style={styles.eventsList}
            renderItem={({ item }) => <EventItem event={item} />}
            keyExtractor={(item) => item.slug}
            contentContainerStyle={{ gap: 16 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white", // O el color que prefieras
  },
  container: {
    paddingTop: 30,
    marginHorizontal: 20,
  },
  header: {
    marginBottom: 30,
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
  section: {},
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
  eventsList: {},
});

export default Screen;
