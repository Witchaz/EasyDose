import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Button, TouchableOpacity } from "react-native";

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={camera.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePicture() {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          base64: true,
        });

        if (photo && photo.base64) {
          setPhoto(`data:image/jpg;base64,${photo.base64}`);
        } else {
          console.error("Failed to capture photo.");
        }
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  }

  async function sendToServer(base64Photo: string) {
    const formBody = `image=${encodeURIComponent(base64Photo)}`;
    
    try {
      return await fetch("https://easydose-server-agipda2psa-as.a.run.app/ocr", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: formBody,
      }).then(response => response.json());
      
    } catch (error) {
      console.error("Error saving photo to server:", error);
    }
  }

  return (
    <View style={camera.container}>
      {photo ? (
        <View style={styles.preview}>
          <Image source={{ uri: photo }} style={styles.image} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setPhoto(null)}
          >
            <Text style={styles.text}>Retake</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              var response = sendToServer(photo.replace("data:image/jpg;base64,", ""));
              console.log(response);
              setPhoto(null);
            }}
          >
            <Text style={styles.text}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <CameraView
          style={camera.camera}
          facing={facing}
          ref={cameraRef}
          // onTouchEnd={toggleCameraFacing}
        >
          <View style={camera.buttonContainer}>
            <TouchableOpacity
              style={camera.captureButton}
              onPress={takePicture}
            >
              <Text style={styles.text}>Capture</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  button: {
    alignSelf: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    color: "#000",
    textAlign: "center",
  },
  preview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "80%",
  },
});

const camera = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  captureButton: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
    height: 105,
    marginLeft: 75,
    marginRight: 75,
    borderRadius: 100,
  },
});
