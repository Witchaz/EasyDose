import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable, Image, ActivityIndicator } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Button, TouchableOpacity } from "react-native";

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
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
    const formBody = {
      image_base64: base64Photo,
    };
    
    try {
      const res = await fetch("https://easydose-server-agipda2psa-as.a.run.app/ocr", {
      // const res = await fetch("http://127.0.0.1:5000/", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formBody),
      });
      const rs = await res.json();
      setResponseText(JSON.stringify(rs, null, 2)); // Update state with response
      return rs;
      
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

          {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              setLoading(true);
              const response = await sendToServer(photo.replace("data:image/jpg;base64,", ""));
              setLoading(false);
              setPhoto(null);
            }}
          >
            <Text style={styles.text}>Save</Text>
          </TouchableOpacity>
      )}
          
        </View>
      ) : (
        <CameraView
          style={camera.camera}
          facing={facing}
          ref={cameraRef}
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
      {responseText && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>{responseText.replaceAll("\n", " ")}</Text>
        </View>
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
  responseContainer: {
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  responseText: {
    fontSize: 16,
    color: "#333",
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
