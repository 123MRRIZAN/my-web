import React, { useState, useRef, useEffect } from "react";
import { FaceProfile } from "@/entities/FaceProfile";
import { UploadFile, InvokeLLM } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, UserPlus, Search, Loader2, CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import CameraCapture from "../components/face/cameracapture";
import RegistrationForm from "../components/face/RegistrationForm";
import RecognitionResult from "../components/face/RecognitionResult";

export default function FaceRecognition() {
  const [mode, setMode] = useState("select"); // select, register, recognize
  const [capturedImage, setCapturedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleCapture = (imageDataUrl) => {
    setCapturedImage(imageDataUrl);
    setShowCamera(false);
  };

  const handleRegister = async (formData) => {
    setIsProcessing(true);
    try {
      // Convert data URL to file
      const blob = await fetch(capturedImage).then(r => r.blob());
      const file = new File([blob], "face.jpg", { type: "image/jpeg" });
      
      // Upload image
      const { file_url } = await UploadFile({ file });
      
      // Generate face description using AI
      const faceDescription = await InvokeLLM({
        prompt: "Describe the facial features in this image in detail for recognition purposes. Focus on distinctive features like face shape, prominent features, etc. Be specific and detailed.",
        file_urls: [file_url],
        response_json_schema: {
          type: "object",
          properties: {
            description: { type: "string" }
          }
        }
      });
      
      // Save profile
      await FaceProfile.create({
        ...formData,
        face_image_url: file_url,
        face_description: faceDescription.description
      });
      
      setRecognitionResult({
        status: "success",
        message: "Face registered successfully!",
        profile: { ...formData, face_image_url: file_url }
      });
      
      setTimeout(() => {
        resetState();
      }, 3000);
      
    } catch (error) {
      console.error("Registration error:", error);
      setRecognitionResult({
        status: "error",
        message: "Failed to register face. Please try again."
      });
    }
    setIsProcessing(false);
  };

  const handleRecognize = async () => {
    setIsProcessing(true);
    try {
      // Convert data URL to file
      const blob = await fetch(capturedImage).then(r => r.blob());
      const file = new File([blob], "face.jpg", { type: "image/jpeg" });
      
      // Upload image
      const { file_url } = await UploadFile({ file });
      
      // Get all profiles
      const profiles = await FaceProfile.list();
      
      if (profiles.length === 0) {
        setRecognitionResult({
          status: "error",
          message: "No registered faces found. Please register first."
        });
        setIsProcessing(false);
        return;
      }
      
      // Generate description of current face
      const currentFaceDesc = await InvokeLLM({
        prompt: "Describe the facial features in this image in detail for recognition purposes. Focus on distinctive features.",
        file_urls: [file_url],
        response_json_schema: {
          type: "object",
          properties: {
            description: { type: "string" }
          }
        }
      });
      
      // Find best match using AI
      const matchResult = await InvokeLLM({
        prompt: `Compare this face description: "${currentFaceDesc.description}" with the following registered profiles and determine the best match. Return the index of the best matching profile (0-${profiles.length - 1}) or -1 if no good match exists. Registered profiles: ${profiles.map((p, i) => `${i}. ${p.face_description}`).join("; ")}`,
        response_json_schema: {
          type: "object",
          properties: {
            match_index: { type: "number" },
            confidence: { type: "string" }
          }
        }
      });
      
      if (matchResult.match_index >= 0 && matchResult.match_index < profiles.length) {
        const matchedProfile = profiles[matchResult.match_index];
        setRecognitionResult({
          status: "success",
          message: "Face recognized!",
          profile: matchedProfile,
          confidence: matchResult.confidence
        });
      } else {
        setRecognitionResult({
          status: "error",
          message: "Face not recognized. Please register first."
        });
      }
      
    } catch (error) {
      console.error("Recognition error:", error);
      setRecognitionResult({
        status: "error",
        message: "Failed to recognize face. Please try again."
      });
    }
    setIsProcessing(false);
  };

  const resetState = () => {
    setMode("select");
    setCapturedImage(null);
    setRecognitionResult(null);
    setShowCamera(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Face Recognition System
          </h1>
          <p className="text-gray-400 text-lg">
            Register your face or get recognized instantly
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {mode === "select" && !recognitionResult && (
            <motion.div
              key="select"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              <Card
                className="bg-[#13131A] border-[#1F1F28] hover:border-purple-500/50 p-8 cursor-pointer group transition-all duration-300"
                onClick={ () => {
                  setMode("register");
                  setShowCamera(true);
                }}
              >
                <div className="text-center">
                  <div className="inline-flex p-6 rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <UserPlus className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Register New Face</h2>
                  <p className="text-gray-400">
                    Capture your face and save your details for future recognition
                  </p>
                </div>
              </Card>

              <Card
                className="bg-[#13131A] border-[#1F1F28] hover:border-purple-500/50 p-8 cursor-pointer group transition-all duration-300"
                onClick={ ()  =>{
                  setMode("recognize");
                  setShowCamera(true);
                }}
              >
                <div className="text-center">
                  <div className="inline-flex p-6 rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Search className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Recognize Face</h2>
                  <p className="text-gray-400">
                    Show your face to retrieve your saved information
                  </p>
                </div>
              </Card>
            </motion.div>
          )}

          {showCamera && !capturedImage && (
            <motion.div
              key="camera"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CameraCapture onCapture={handleCapture} onCancel={resetState} />
            </motion.div>
          )}

          {capturedImage && mode === "register" && !recognitionResult && (
            <motion.div
              key="register-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <RegistrationForm
                capturedImage={capturedImage}
                onSubmit={handleRegister}
                onCancel={resetState}
                isProcessing={isProcessing}
              />
            </motion.div>
          )}

          {capturedImage && mode === "recognize" && !recognitionResult && (
            <motion.div
              key="recognize"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="bg-[#13131A] border-[#1F1F28] p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">Captured Image</h2>
                  <p className="text-gray-400">Click recognize to identify this person</p>
                </div>
                
                <div className="relative mb-6">
                  <img
                    src={capturedImage}
                    alt="Captured"
                    className="w-full h-96 object-cover rounded-xl"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-700"
                    onClick={resetState}
                    disabled={isProcessing}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    onClick={handleRecognize}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Recognizing...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Recognize Face
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {recognitionResult && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <RecognitionResult result={recognitionResult} onClose={resetState} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
