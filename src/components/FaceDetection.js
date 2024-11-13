"use client"
// components/FaceDetection.js
import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const FaceDetection = () => {
  const videoRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [detectionStatus, setDetectionStatus] = useState("");

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models"; // models should be in public/models
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
    };

    loadModels();
  }, []);

  useEffect(() => {
    if (modelsLoaded) {
      startVideo();
    }
  }, [modelsLoaded]);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam:", err));
  };

  const handleVideoPlay = () => {
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      );

      if (detections.length > 0) {
        setDetectionStatus("Face Detected");
      } else {
        setDetectionStatus("No Face Detected");
      }
    }, 1000); // Run every second
  };

  return (
    <div>
      <h2>Face Detection</h2>
      <video
        ref={videoRef}
        autoPlay
        muted
        onPlay={handleVideoPlay}
        style={{ width: "100%", height: "auto" }}
      />
      <p>Status: {detectionStatus}</p>
    </div>
  );
};

export default FaceDetection;
