import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, X } from "lucide-react";
import { motion } from "framer-motion";

export default function CameraCapture({ onCapture, onCancel }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 1280, height: 720 },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraReady(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please ensure you've granted camera permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraReady(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || !isCameraReady) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);
    
    const imageDataUrl = canvas.toDataURL("image/jpeg", 0.8);
    stopCamera();
    onCapture(imageDataUrl);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="bg-[#13131A] border-[#1F1F28] p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Position Your Face</h2>
          <p className="text-gray-400">Make sure your face is clearly visible and well-lit</p>
        </div>

        <div className="relative aspect-video bg-black rounded-xl overflow-hidden mb-6">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />
          <canvas ref={canvasRef} className="hidden" />
          
          {!isCameraReady && (
            <div className="absolute inset-0 flex items-center justify-center text-white bg-black/50">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4" />
                <p>Starting camera...</p>
              </div>
            </div>
          )}

          {/* Face guide overlay */}
          {isCameraReady && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-80 border-4 border-purple-500 rounded-full opacity-30" />
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1 border-gray-700"
            onClick={onCancel}
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            onClick={capturePhoto}
            disabled={!isCameraReady}
          >
            <Camera className="w-4 h-4 mr-2" />
            Capture Photo
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
