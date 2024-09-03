import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { WebView } from "react-native-webview";
import { CalendarIcon, CloseIcon } from "@/components/icons";
import { EventType } from "@/types/Event";

interface Props {
  event: EventType;
  fullWidth?: boolean;
}

export function EventItem({ event, fullWidth }: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <TouchableHighlight onPress={openModal} underlayColor="transparent">
        <View
          style={{
            ...(fullWidth ? { alignSelf: "stretch" } : { width: 300 }),
          }}
        >
          <Image
            style={styles.eventImage}
            source={{
              uri: event.cover_image,
            }}
          />
          <View style={styles.eventContent}>
            <Text style={styles.eventDateText}>
              <CalendarIcon style={styles.eventDateIcon} color="#6d28d9" />
              {event.start_date === event.end_date ? (
                new Date(event.start_date).toLocaleDateString("es-LA", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              ) : (
                <>
                  {new Date(event.start_date).toLocaleDateString("es-LA", {
                    day: "2-digit",
                    month: "short",
                  })}{" "}
                  hasta{" "}
                  {new Date(event.end_date).toLocaleDateString("es-LA", {
                    day: "2-digit",
                    month: "short",
                  })}
                </>
              )}
            </Text>
            <Text
              style={styles.eventName}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {event.name}
            </Text>
            <Text style={styles.eventLocation}>{event.location_name}</Text>
          </View>
        </View>
      </TouchableHighlight>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContainerHeader}>
            <TouchableOpacity onPress={closeModal}>
              <CloseIcon style={styles.modalContainerCloseIcon} />
            </TouchableOpacity>
            <Text
              style={styles.modalContainerName}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {event.name}
            </Text>
            <View />
          </View>
          <WebView source={{ uri: event.url }} style={styles.webView} />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  eventImage: {
    aspectRatio: "16 / 9",
    width: "100%",
    borderRadius: 16,
  },
  eventContent: {
    paddingVertical: 16,
  },
  eventDateText: {
    color: "#6d28d9",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  eventDateIcon: {
    width: 20,
    height: 20,
    marginTop: -4,
    marginRight: 8,
  },
  eventName: {
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 28,
  },
  eventLocation: {
    color: "#374151",
    fontSize: 14,
    lineHeight: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 40,
  },
  modalContainerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  modalContainerCloseIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  modalContainerName: {
    fontWeight: "600",
    color: "#374151",
    fontSize: 14,
    lineHeight: 20,
  },
  webView: {
    flex: 1,
  },
});
