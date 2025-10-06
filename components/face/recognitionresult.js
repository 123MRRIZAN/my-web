import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle, User, Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function RecognitionResult({ result, onClose }) {
  const isSuccess = result.status === "success";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="bg-[#13131A] border-[#1F1F28] p-8">
        <div className="text-center mb-8">
          <div className={`inline-flex p-6 rounded-full mb-4 ${
            isSuccess 
              ? "bg-green-500/20" 
              : "bg-red-500/20"
          }`}>
            {isSuccess ? (
              <CheckCircle className="w-16 h-16 text-green-500" />
            ) : (
              <XCircle className="w-16 h-16 text-red-500" />
            )}
          </div>
          
          <h2 className="text-3xl font-bold mb-2">{result.message}</h2>
          {result.confidence && (
            <p className="text-gray-400">Confidence: {result.confidence}</p>
          )}
        </div>

        {isSuccess && result.profile && (
          <div className="space-y-6 mb-8">
            {result.profile.face_image_url && (
              <div className="flex justify-center mb-6">
                <img
                  src={result.profile.face_image_url}
                  alt="Profile"
                  className="w-48 h-48 object-cover rounded-2xl border-4 border-purple-500/30"
                />
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-[#1F1F28] p-6 rounded-xl text-center">
                <User className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                <p className="text-sm text-gray-400 mb-1">Name</p>
                <p className="text-xl font-bold">{result.profile.user_name}</p>
              </div>

              <div className="bg-[#1F1F28] p-6 rounded-xl text-center">
                <Calendar className="w-8 h-8 mx-auto mb-3 text-pink-400" />
                <p className="text-sm text-gray-400 mb-1">Age</p>
                <p className="text-xl font-bold">{result.profile.age}</p>
              </div>

              <div className="bg-[#1F1F28] p-6 rounded-xl text-center">
                <Users className="w-8 h-8 mx-auto mb-3 text-orange-400" />
                <p className="text-sm text-gray-400 mb-1">Gender</p>
                <p className="text-xl font-bold">{result.profile.gender}</p>
              </div>
            </div>
          </div>
        )}

        <Button
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          onClick={onClose}
        >
          Done
        </Button>
      </Card>
    </motion.div>
  );
}
