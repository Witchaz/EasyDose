import React, {useState, useEffect} from 'react';
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
export default function Camera() {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text>Text</Text>
      </Pressable>
      <CameraView style={styles.camera}>
        <View style={styles.buttonContainer}></View>
      </CameraView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
  camera: {},
  buttonContainer: {},
  button: {},
  text: {},
});
