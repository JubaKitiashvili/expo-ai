"use client";
import React from "react";
import { Text, View } from "react-native";

export function UserMessage({ children }: { children?: React.ReactNode }) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
        maxWidth: "100%",
        paddingHorizontal: 16,
        gap: 8,
      }}
    >
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <Text
          numberOfLines={100}
          style={{
            borderCurve: "continuous",
            backgroundColor: "white",
            borderRadius: 20,
            borderBottomRightRadius: 8,
            flexWrap: "wrap",
            wordWrap: "break-word",
            textAlign: "right",
            color: "#102151",
            padding: 12,
            fontSize: 16,
          }}
          selectable
        >
          {children}
        </Text>
      </View>
    </View>
  );
}
